import type { SortingState } from '@tanstack/react-table';
import type { IIndexResponse } from '../services/types';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { parseAsString, useQueryStates, parseAsInteger, parseAsStringEnum } from 'nuqs';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
  getPaginationRowModel,
} from '@tanstack/react-table';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Switch from '@mui/material/Switch';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { TableNoData } from 'src/components/table';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import Filters from './components/filters';
import Statuses from './components/statuses';
import FilterResults from './components/filterResults';
import { Statuses as StatusesEnum } from '../services/types';
import { referencesClientTypesService, REFERENCES_CLIENT_TYPES_BASE_QUERY_KEY } from '../services';

// ----------------------------------------------------------------------

type IClientType = IIndexResponse['result'][number];

const metadata = { title: `Client Types - ${CONFIG.appName}` };
const fallBackData: any[] = [];

export default function Page() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [dense, setDense] = useState(false);

  const [{ status, search, ...pagination }, setQueryStates] = useQueryStates(
    {
      status: parseAsStringEnum<StatusesEnum>(Object.values(StatusesEnum)).withDefault(
        StatusesEnum.all
      ),
      search: parseAsString.withDefault(''),

      currentPage: parseAsInteger.withDefault(0),
      dataPerPage: parseAsInteger.withDefault(5),
    },
    {
      history: 'push',
    }
  );

  const columnHelper = createColumnHelper<IClientType>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('nameUz', {
        header: 'Name Uz',
        sortingFn: 'alphanumeric',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('nameRu', {
        header: 'Name Ru',
        sortingFn: 'alphanumeric',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created At',
        sortingFn: 'datetime',
        cell: (info) => {
          const date = new Date(info.getValue());
          return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        },
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => (
          <Label
            variant="soft"
            color={
              (info.getValue() === 'active' && 'success') ||
              (info.getValue() === 'deleted' && 'error') ||
              'default'
            }
          >
            {info.getValue()}
          </Label>
        ),
      }),
    ],
    [columnHelper]
  );

  const {
    isFetched,
    data: countsByStatus = {
      [StatusesEnum.all]: 0,
      [StatusesEnum.active]: 0,
      [StatusesEnum.deleted]: 0,
    },
  } = useQuery({
    queryKey: [REFERENCES_CLIENT_TYPES_BASE_QUERY_KEY, 'getCountsByStatus'],
    queryFn: async () => {
      try {
        const response = await referencesClientTypesService.helpers.getCountsByStatus();
        return response;
      } catch (error: unknown) {
        console.log('error', error);
        return {
          [StatusesEnum.all]: 0,
          [StatusesEnum.active]: 0,
          [StatusesEnum.deleted]: 0,
        };
      }
    },
  });

  const {
    isLoading,
    data = {
      result: fallBackData,
      pagination: {
        currentPage: 0,
        dataPerPage: 5,
        totalData: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    },
  } = useQuery({
    queryKey: [
      REFERENCES_CLIENT_TYPES_BASE_QUERY_KEY,
      'index',
      pagination.currentPage,
      pagination.dataPerPage,
      status,
      search,
    ],
    enabled: isFetched,
    queryFn: async () => {
      try {
        const response = await referencesClientTypesService.index({
          status,
          search,
          currentPage: pagination.currentPage,
          dataPerPage: pagination.dataPerPage,
        });
        return response;
      } catch (error: unknown) {
        return {
          result: fallBackData,
          pagination: {
            currentPage: 0,
            dataPerPage: 5,
            totalData: 0,
            totalPages: 1,
            hasNextPage: false,
            hasPrevPage: false,
          },
        };
      }
    },
  });

  const table = useReactTable({
    data: data.result,
    columns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount: data.pagination.totalPages,
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      pagination: {
        pageSize: pagination.dataPerPage,
        pageIndex: pagination.currentPage,
      },
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === 'function' ? updater(table.getState().pagination) : updater;
      setQueryStates({
        dataPerPage: newPagination.pageSize,
        currentPage: newPagination.pageIndex + 1,
      });
    },
  });

  const hasData = useMemo(() => data.result.length > 0, [data.result]);

  return (
    <>
      <title>{metadata.title}</title>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Client Types"
          links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Client Types' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Card>
          <Statuses countsByStatus={countsByStatus} />
          <Filters />
          <FilterResults totalResults={data.result.length} />

          <Box sx={{ position: 'relative' }}>
            <Scrollbar>
              <Table
                size={dense ? 'small' : 'medium'}
                sx={{
                  minWidth: 960,
                }}
              >
                <TableHead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableCell key={header.id} colSpan={header.colSpan}>
                          {header.column.getCanSort() ? (
                            <Box
                              onClick={header.column.getToggleSortingHandler()}
                              sx={{
                                color: header.column.getIsSorted()
                                  ? 'text.primary'
                                  : 'text.secondary',
                                cursor: 'pointer',
                                userSelect: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                '&:hover': {
                                  opacity: 0.8,
                                },
                              }}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: <Iconify icon="eva:arrow-upward-fill" />,
                                desc: <Iconify icon="eva:arrow-downward-fill" />,
                              }[header.column.getIsSorted() as string] ?? ''}
                            </Box>
                          ) : (
                            flexRender(header.column.columnDef.header, header.getContext())
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableHead>

                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        {columns.map((column, columnIndex) => (
                          <TableCell key={columnIndex}>
                            <Skeleton variant="rounded" animation="wave" height={20} />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : hasData ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableNoData notFound />
                  )}
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>
          <Box sx={{ position: 'relative' }}>
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              page={pagination.currentPage}
              count={data.pagination.totalData}
              onPageChange={(_, newPage) => setQueryStates({ currentPage: newPage })}
              sx={{ borderTopColor: 'transparent' }}
              rowsPerPage={data.pagination.dataPerPage}
              onRowsPerPageChange={(event) => {
                setQueryStates({ dataPerPage: Number(event.target.value) });
              }}
            />

            <FormControlLabel
              label="Dense"
              control={
                <Switch
                  checked={dense}
                  onChange={() => setDense(!dense)}
                  slotProps={{ input: { id: 'dense-switch' } }}
                />
              }
              sx={{
                pl: 2,
                py: 1.5,
                top: 0,
                position: { sm: 'absolute' },
              }}
            />
          </Box>
        </Card>
      </DashboardContent>
    </>
  );
}
