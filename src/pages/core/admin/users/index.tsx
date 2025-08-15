import type { IIndexResponse } from './services/types';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  parseAsString,
  parseAsArrayOf,
  useQueryStates,
  parseAsInteger,
  parseAsStringEnum,
} from 'nuqs';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  getPaginationRowModel,
} from '@tanstack/react-table';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/global-config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import Filters from './components/filters';
import Statuses from './components/statuses';
import FilterResults from './components/filterResults';
import { usersService, USERS_BASE_QUERY_KEY } from './services';
import { Roles, Statuses as StatusesEnum } from './services/types';

// ----------------------------------------------------------------------

type IUser = IIndexResponse['result'][number];

const metadata = { title: `Users - ${CONFIG.appName}` };
const fallBackData: any[] = [];

export default function Page() {
  const [rowSelection, setRowSelection] = useState({});
  const [dense, setDense] = useState(false);

  const [{ status, roles, search, ...pagination }, setQueryStates] = useQueryStates(
    {
      roles: parseAsArrayOf(parseAsStringEnum<Roles>(Object.values(Roles))).withDefault([]),
      status: parseAsStringEnum<StatusesEnum>(Object.values(StatusesEnum)).withDefault(
        StatusesEnum.all
      ),
      search: parseAsString.withDefault(''),

      page: parseAsInteger.withDefault(1),
      pageSize: parseAsInteger.withDefault(10),
    },
    {
      history: 'push',
    }
  );

  const columnHelper = createColumnHelper<IUser>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('username', {
        header: 'Username',
        // cell: (info) => info.getValue(),
      }),
    ],
    [columnHelper]
  );

  const {
    data = {
      result: fallBackData,
      pagination: {
        page: 1,
        pageCount: 1,
        sizePerPage: 10,
      },
    },
  } = useQuery({
    queryKey: [USERS_BASE_QUERY_KEY, 'index', status, roles, search],
    queryFn: async () => {
      try {
        const response = await usersService.index({ status, roles, search });
        return response;
      } catch (error: unknown) {
        console.log('error', error);
        return {
          result: fallBackData,
          pagination: {
            page: 1,
            pageCount: 1,
            sizePerPage: 10,
          },
        };
      }
    },
  });

  const table = useReactTable({
    data: data.result,
    columns,
    manualPagination: true,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    pageCount: data.pagination.pageCount,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
      pagination: {
        pageSize: pagination.pageSize,
        pageIndex: pagination.page - 1,
      },
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === 'function' ? updater(table.getState().pagination) : updater;
      setQueryStates({
        pageSize: newPagination.pageSize,
        page: newPagination.pageIndex + 1,
      });
    },
  });

  return (
    <>
      <title>{metadata.title}</title>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="List"
          links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Users' }]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.user.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Add user
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Card>
          <Statuses count={data.result.length} />
          <Filters />
          <FilterResults totalResults={data.result.length} />

          <Box sx={{ position: 'relative' }}>
            {Object.keys(rowSelection).length ? (
              <Box
                sx={[
                  () => ({
                    pl: 1,
                    pr: 2,
                    top: 0,
                    left: 0,
                    width: 1,
                    zIndex: 9,
                    height: 58,
                    display: 'flex',
                    position: 'absolute',
                    alignItems: 'center',
                    bgcolor: 'primary.lighter',
                    ...(dense && { height: 38 }),
                  }),
                ]}
              >
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

                <Typography
                  variant="subtitle2"
                  sx={{
                    ml: 2,
                    flexGrow: 1,
                    color: 'primary.main',
                    ...(dense && { ml: 3 }),
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
              </Box>
            ) : null}
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      <>
                        <TableCell sx={{ width: 50 }}>
                          <Checkbox
                            onChange={table.getToggleAllRowsSelectedHandler()}
                            checked={table.getIsAllRowsSelected()}
                            indeterminate={table.getIsSomeRowsSelected()}
                          />
                        </TableCell>
                        {headerGroup.headers.map((header) => (
                          <TableCell key={header.id} colSpan={header.colSpan}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </TableCell>
                        ))}
                      </>
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody>
                  {table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      key={row.id}
                      onDoubleClick={row.getToggleSelectedHandler()}
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
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>
          <Box sx={{ position: 'relative' }}>
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25]}
              page={pagination.page}
              count={data.pagination.pageCount}
              onPageChange={(_, newPage) => setQueryStates({ page: newPage })}
              sx={{ borderTopColor: 'transparent' }}
              rowsPerPage={data.pagination.sizePerPage}
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
