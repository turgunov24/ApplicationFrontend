import { useState } from 'react';
import { isEqual } from 'es-toolkit';
import { HttpStatusCode } from 'axios';
import { Fragment } from 'react/jsx-runtime';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { paths } from 'src/routes/paths';

import axiosInstance from 'src/lib/axios';
import { CONFIG } from 'src/global-config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

type IRolesListResponse = Array<{
  id: number;
  nameUz: string;
  nameRu: string;
  descriptionUz: string;
  descriptionRu: string;
}>;

type IPermissionGroupsListResponse = Array<{
  id: number;
  nameUz: string;
  nameRu: string;
  permissions: Array<{
    id: number;
    nameUz: string;
    nameRu: string;
  }>;
}>;

type IRolesPermissionsListResponse = Record<string, Array<number>>;

const metadata = { title: `Roles - ${CONFIG.appName}` };

export const REFERENCES_ASSIGN_PERMISSIONS_TO_ROLES_BASE_QUERY_KEY =
  'REFERENCES_ASSIGN_PERMISSIONS_TO_ROLES_BASE_QUERY_KEY';

export default function Page() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [assignments, setAssignments] = useState<IRolesPermissionsListResponse>({});

  const isChecked = (roleId: string, permissionId: number) =>
    assignments[roleId]?.includes(permissionId) || false;

  // Toggle permission for a role
  const togglePermission = (roleId: string, permissionId: number) => {
    const rolePermissions = [...(assignments[roleId] || [])];
    const index = rolePermissions.indexOf(permissionId);

    if (index > -1) {
      rolePermissions.splice(index, 1);
    } else {
      rolePermissions.push(permissionId);
    }

    setAssignments({
      ...assignments,
      [roleId]: rolePermissions,
    });
  };

  const { data: rolesList = [], isFetched: isRolesListFetched } = useQuery({
    queryKey: [REFERENCES_ASSIGN_PERMISSIONS_TO_ROLES_BASE_QUERY_KEY, 'roles-list'],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<IRolesListResponse>('/references/roles/list');
        return response.data;
      } catch (error: unknown) {
        console.log('error while getting roles list', error);
        return [];
      }
    },
  });

  const { data: permissionGroupsList = [], isFetched: isPermissionGroupsListFetched } = useQuery({
    enabled: isRolesListFetched,
    queryKey: [REFERENCES_ASSIGN_PERMISSIONS_TO_ROLES_BASE_QUERY_KEY, 'permissions-groups-list'],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<IPermissionGroupsListResponse>(
          '/references/permission-groups/list'
        );
        return response.data;
      } catch (error: unknown) {
        console.log('error while getting permissions groups list', error);
        return [];
      }
    },
  });

  const { data: rolesPermissions = [] } = useQuery({
    enabled: isPermissionGroupsListFetched,
    queryKey: [REFERENCES_ASSIGN_PERMISSIONS_TO_ROLES_BASE_QUERY_KEY, 'roles-permissions'],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<IRolesPermissionsListResponse>(
          '/references/roles-permissions'
        );

        if (response.status === HttpStatusCode.Ok) setAssignments(response.data);
        return response.data;
      } catch (error: unknown) {
        console.log('error while getting roles permissions list', error);
        return [];
      }
    },
  });

  const { mutate: saveAssignments, isPending: isSavingAssignments } = useMutation({
    mutationKey: [REFERENCES_ASSIGN_PERMISSIONS_TO_ROLES_BASE_QUERY_KEY, 'save-assignments'],
    mutationFn: async () => {
      const values = [];
      for (const [key, value] of Object.entries(assignments)) {
        values.push({
          roleId: key,
          permissionIds: value,
        });
      }

      await axiosInstance.put('/references/roles-permissions', { values });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [REFERENCES_ASSIGN_PERMISSIONS_TO_ROLES_BASE_QUERY_KEY, 'roles-permissions'],
      });
    },
  });

  return (
    <>
      <title>{metadata.title}</title>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Assign Permissions to Roles' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
          action={
            <Button
              variant="contained"
              // @ts-expect-error icon namesi uchun bervotti
              startIcon={<Iconify icon="mynaui:save" />}
              disabled={isEqual(assignments, rolesPermissions)}
              onClick={() => saveAssignments()}
              loading={isSavingAssignments}
            >
              Save
            </Button>
          }
        />
        <Card>
          <TableContainer>
            <Table
              sx={{
                [`.${tableCellClasses.root}`]: {
                  '&:nth-of-type(1)': {
                    minWidth: theme.spacing(8),
                    maxWidth: theme.spacing(8),
                    backgroundColor: 'background.default',
                    border: 'none',
                    boxShadow: theme.vars.customShadows.card,
                  },
                },
                [`.${tableCellClasses.head}`]: {
                  '&:nth-of-type(1)': {
                    position: 'sticky',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 1,
                    whiteSpace: 'pre-wrap',
                  },
                },
                [`.${tableCellClasses.body}`]: {
                  '&:nth-of-type(1)': {
                    position: 'sticky',
                    left: 0,
                    zIndex: 3,
                  },
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" color="textPrimary">
                      Permissions
                    </Typography>
                  </TableCell>
                  {rolesList.map((role) => (
                    <TableCell key={role.id}>{role.nameUz}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {permissionGroupsList.map((permissionGroup) => (
                  <Fragment key={permissionGroup.id}>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2" color="textDisabled">
                          {permissionGroup.nameUz}
                        </Typography>
                      </TableCell>
                      <TableCell colSpan={rolesList.length} />
                    </TableRow>
                    {permissionGroup.permissions.map((permission) => (
                      <TableRow key={permission.id}>
                        <TableCell>{permission.nameUz}</TableCell>
                        {rolesList.map((role) => (
                          <TableCell key={role.id}>
                            <Checkbox
                              checked={isChecked(role.id.toString(), permission.id)}
                              onChange={() => togglePermission(role.id.toString(), permission.id)}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </DashboardContent>
    </>
  );
}
