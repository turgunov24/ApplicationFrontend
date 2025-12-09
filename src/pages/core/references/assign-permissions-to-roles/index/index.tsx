import { isEqual } from 'es-toolkit';
import { useMemo, Fragment, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { paths } from 'src/routes/paths';

import useList from 'src/hooks/useList/v1/Index';

import { CONFIG } from 'src/global-config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import {
  referencesAssignPermissionsToRolesService,
  REFERENCES_ASSIGN_PERMISSIONS_TO_ROLES_BASE_QUERY_KEY,
} from '../services';

// ----------------------------------------------------------------------

type IRolesPermissionsMap = Record<string, Array<number>>;

const metadata = { title: `Roles - ${CONFIG.appName}` };

export default function Page() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [assignments, setAssignments] = useState<IRolesPermissionsMap>({});

  const { data: rolesList = [], isFetched: isRolesListFetched } = useList({ listType: 'roles' });
  const { data: permissionGroupsList = [], isFetched: isPermissionGroupsListFetched } = useList({
    listType: 'permissionGroups',
  });

  const { data: rolesPermissionsResponse } = useQuery({
    enabled: isRolesListFetched && isPermissionGroupsListFetched,
    queryKey: [REFERENCES_ASSIGN_PERMISSIONS_TO_ROLES_BASE_QUERY_KEY, 'roles-permissions'],
    queryFn: async () => {
      try {
        const response = await referencesAssignPermissionsToRolesService.getAssignments();
        return response.data;
      } catch (error: unknown) {
        console.log('error while getting roles permissions list', error);
        return [];
      }
    },
  });

  // Transform backend response to internal format: Record<roleId, permissionIds[]>
  const initialAssignments = useMemo<IRolesPermissionsMap>(() => {
    if (!rolesPermissionsResponse) return {};

    const map: IRolesPermissionsMap = {};
    rolesPermissionsResponse.forEach((item) => {
      // Sort to ensure consistent comparison
      map[item.id.toString()] = [...item.permissions].sort((a, b) => a - b);
    });
    return map;
  }, [rolesPermissionsResponse]);

  // Initialize assignments from backend response
  useEffect(() => {
    if (rolesPermissionsResponse && Object.keys(initialAssignments).length > 0) {
      setAssignments(initialAssignments);
    }
  }, [initialAssignments, rolesPermissionsResponse]);

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

    // Sort to ensure consistent comparison with initialAssignments
    rolePermissions.sort((a, b) => a - b);

    setAssignments({
      ...assignments,
      [roleId]: rolePermissions,
    });
  };

  const { mutate: saveAssignments, isPending: isSavingAssignments } = useMutation({
    mutationKey: [REFERENCES_ASSIGN_PERMISSIONS_TO_ROLES_BASE_QUERY_KEY, 'save-assignments'],
    mutationFn: async () => {
      const values = [];
      for (const [roleId, permissionIds] of Object.entries(assignments)) {
        values.push({
          roleId: Number(roleId),
          permissionIds,
        });
      }

      await referencesAssignPermissionsToRolesService.updateAssignments({ values });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [REFERENCES_ASSIGN_PERMISSIONS_TO_ROLES_BASE_QUERY_KEY, 'roles-permissions'],
      });
      // Reset assignments to initial state after successful save
      setAssignments(initialAssignments);
    },
  });

  const hasChanges = useMemo(
    () => !isEqual(assignments, initialAssignments),
    [assignments, initialAssignments]
  );

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
              disabled={!hasChanges || isSavingAssignments}
              onClick={() => saveAssignments()}
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
