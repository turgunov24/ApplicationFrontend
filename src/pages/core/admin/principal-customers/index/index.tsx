import type { SortingState } from '@tanstack/react-table';
import type { IIndexResponse } from '../services/types';

import { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Skeleton from '@mui/material/Skeleton';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TablePagination from '@mui/material/TablePagination';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { fDateTime } from 'src/utils/format-time';

import { CONFIG } from 'src/global-config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { TableNoData } from 'src/components/table';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { RenderElementByPermission } from 'src/auth/guard';

import Filters from './components/filters';
import Statuses from './components/statuses';
import FilterResults from './components/filterResults';
import { Statuses as StatusesEnum } from '../services/types';
import { principalCustomersPermissions } from '../helpers/permissions';
import { principalCustomersService, PRINCIPAL_CUSTOMERS_BASE_QUERY_KEY } from '../services';

// ----------------------------------------------------------------------

type IPrincipalCustomer = IIndexResponse['result'][number];

const metadata = { title: `Principal Customers - ${CONFIG.appName}` };
const fallBackData: any[] = [];

export default function Page() {
  const [rowSelection, setRowSelection] = useState({});
  const [dense, setDense] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const router = useRouter();
  const [idForDelete, setIdForDelete] = useState<IPrincipalCustomer['id'] | null>(null);
  const queryClient = useQueryClient();
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

  const columnHelper = createColumnHelper<IPrincipalCustomer>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ row }) => (
          <Link
            component={RouterLink}
            href={paths.dashboard.principalCustomers.edit(row.original.id.toString())}
            color="inherit"
            sx={{ cursor: 'pointer' }}
          >
            {row.original.name}
          </Link>
        ),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created At',
        sortingFn: 'datetime',
        cell: (info) => fDateTime(info.getValue()),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => (
          <Label
            variant="soft"
            color={
              (info.getValue() === 'active' && 'success') ||
              (info.getValue() === 'pending' && 'warning') ||
              (info.getValue() === 'banned' && 'error') ||
              'default'
            }
          >
            {info.getValue()}
          </Label>
        ),
      }),
      columnHelper.accessor('id', {
        header: 'Actions',
        cell: (info) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RenderElementByPermission permissions={[principalCustomersPermissions.update]}>
              <Tooltip title="Quick edit" placement="top" arrow>
                <IconButton
                  color="info"
                  onClick={() => {
                    router.push(
                      paths.dashboard.principalCustomers.edit(info.getValue().toString())
                    );
                  }}
                >
                  <Iconify icon="solar:pen-bold" />
                </IconButton>
              </Tooltip>
            </RenderElementByPermission>

            <RenderElementByPermission permissions={[principalCustomersPermissions.delete]}>
              <IconButton color="error" onClick={() => setIdForDelete(info.getValue())}>
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </RenderElementByPermission>
          </Box>
        ),
      }),
    ],
    [columnHelper, router]
  );

  const {
    isFetched,
    data: countsByStatus = {
      [StatusesEnum.all]: 0,
      [StatusesEnum.active]: 0,
      [StatusesEnum.pending]: 0,
      [StatusesEnum.banned]: 0,
      [StatusesEnum.rejected]: 0,
    },
  } = useQuery({
    queryKey: [PRINCIPAL_CUSTOMERS_BASE_QUERY_KEY, 'getCountsByStatus'],
    queryFn: async () => {
      try {
        const response = await principalCustomersService.helpers.getCountsByStatus();
        return response;
      } catch (error: unknown) {
        console.log('error', error);
        return {
          [StatusesEnum.all]: 0,
          [StatusesEnum.active]: 0,
          [StatusesEnum.pending]: 0,
          [StatusesEnum.banned]: 0,
          [StatusesEnum.rejected]: 0,
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
      PRINCIPAL_CUSTOMERS_BASE_QUERY_KEY,
      'index',
      pagination.currentPage,
      pagination.dataPerPage,
      status,
      search,
    ],
    enabled: isFetched,
    queryFn: async () => {
      try {
        const response = await principalCustomersService.index({
          status,
          search,
          currentPage: pagination.currentPage,
          dataPerPage: pagination.dataPerPage,
        });
        return response;
      } catch (error: unknown) {
        console.log('error', error);
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

  const { mutate: deleteItem } = useMutation({
    mutationKey: [PRINCIPAL_CUSTOMERS_BASE_QUERY_KEY, 'delete'],
    mutationFn: async (id: IPrincipalCustomer['id']) => {
      try {
        const response = await principalCustomersService.form.delete(id);
        return response;
      } catch (error: unknown) {
        console.log('error', error);
        return false;
      }
    },
    onSuccess: () => {
      toast.success('Delete success!');
      setIdForDelete(null);
      queryClient.invalidateQueries({ queryKey: [PRINCIPAL_CUSTOMERS_BASE_QUERY_KEY] });
    },
    onError: () => {
      toast.error('Delete failed!');
    },
  });

  const table = useReactTable({
    data: data.result,
    columns,
    manualPagination: true,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount: data.pagination.totalPages,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
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

  const hasSelectedRows = useMemo(() => Object.keys(rowSelection).length > 0, [rowSelection]);
  const hasData = useMemo(() => data.result.length > 0, [data.result]);

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={!!idForDelete}
      onClose={() => setIdForDelete(null)}
      title="Delete"
      content="Are you sure want to delete?"
      action={
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            deleteItem(idForDelete!);
            setIdForDelete(null);
          }}
        >
          Delete
        </Button>
      }
    />
  );

  return (
    <>
      <title>{metadata.title}</title>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Principal Customers' },
          ]}
          action={
            <RenderElementByPermission permissions={[principalCustomersPermissions.create]}>
              <Button
                component={RouterLink}
                href={paths.dashboard.principalCustomers.create}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                Add principal customer
              </Button>
            </RenderElementByPermission>
          }
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
                  ...(hasSelectedRows && {
                    thead: {
                      th: {
                        bgcolor: 'primary.lighter',
                      },
                    },
                  }),
                }}
              >
                {hasSelectedRows ? (
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Checkbox
                          indeterminate={
                            !!table.getSelectedRowModel().rows.length &&
                            table.getSelectedRowModel().rows.length < data.result.length
                          }
                          checked={
                            !!data.result.length &&
                            table.getSelectedRowModel().rows.length === data.result.length
                          }
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            table.getToggleAllRowsSelectedHandler()(event)
                          }
                          slotProps={{
                            input: {
                              id: 'deselect-all-checkbox',
                              'aria-label': 'Deselect all checkbox',
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell colSpan={5}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography
                            variant="subtitle2"
                            sx={{
                              flexGrow: 1,
                              color: 'primary.main',
                            }}
                          >
                            {table.getIsAllRowsSelected()
                              ? 'All'
                              : `${table.getSelectedRowModel().rows.length} selected`}
                          </Typography>
                          <Tooltip title="Delete">
                            <IconButton color="primary" onClick={() => {}}>
                              <Iconify icon="solar:trash-bin-trash-bold" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                ) : (
                  <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        <TableCell sx={{ width: 50 }}>
                          <Checkbox
                            onChange={table.getToggleAllRowsSelectedHandler()}
                            checked={table.getIsAllRowsSelected()}
                            indeterminate={table.getIsSomeRowsSelected()}
                          />
                        </TableCell>
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
                )}

                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton variant="rounded" animation="wave" height={20} />
                        </TableCell>
                        {columns.map((column, columnIndex) => (
                          <TableCell key={columnIndex}>
                            <Skeleton variant="rounded" animation="wave" height={20} />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : hasData ? (
                    table.getRowModel().rows.map((row, index) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:hover #actions': {
                            opacity: 1,
                          },
                        }}
                      >
                        <>
                          <TableCell sx={{ width: 50 }}>
                            <Checkbox
                              checked={row.getIsSelected()}
                              onChange={row.getToggleSelectedHandler()}
                              disabled={!row.getCanSelect()}
                              indeterminate={row.getIsSomeSelected()}
                            />
                          </TableCell>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </>
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
      {renderConfirmDialog()}
    </>
  );
}
