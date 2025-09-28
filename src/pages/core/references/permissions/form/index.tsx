import type { IForm } from './form';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation } from '@tanstack/react-query';
import { parseAsInteger, useQueryStates, parseAsBoolean } from 'nuqs';

import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import useList from 'src/hooks/useList/v1/Index';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import SetValues from './setValues';
import { IFormSchema, defaultValues } from './form';
import { referencesPermissionGroupsService } from '../../permission-groups/services';
import { referencesPermissionsService, REFERENCES_PERMISSIONS_BASE_QUERY_KEY } from '../services';

export default function FormComponent() {
  const [{ permissionId }, setQueryStates] = useQueryStates(
    {
      permissionId: parseAsInteger,
      formOpen: parseAsBoolean,
    },
    {
      history: 'push',
    }
  );

  const form = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(IFormSchema),
    defaultValues,
  });

  const resource = form.watch('resource');

  const { data: permissionGroups = [] } = useQuery({
    queryKey: [REFERENCES_PERMISSIONS_BASE_QUERY_KEY, 'permission-groups-list'],
    queryFn: async () => {
      const response = await referencesPermissionGroupsService.helpers.list();
      return response;
    },
  });

  const { data: resourcesList = [] } = useList({ listType: 'resources' });

  const actions = useMemo(() => {
    if (!resource) return [];

    const found = resourcesList.find((r) => r.endpoint === resource);
    if (!found) return [];

    return found.allowedActions.map((action) => ({
      label: action,
      id: action,
    }));
  }, [resource, resourcesList]);

  const { mutateAsync } = useMutation({
    mutationKey: [REFERENCES_PERMISSIONS_BASE_QUERY_KEY, 'save'],
    mutationFn: async (values: IForm) => {
      if (permissionId) {
        const response = await referencesPermissionsService.form.update(
          Number(permissionId),
          values
        );
        return response;
      }
      const response = await referencesPermissionsService.form.create(values);
      return response;
    },
    onSuccess: () => {
      toast.success(permissionId ? 'Update success!' : 'Create success!');
      setQueryStates({ permissionId: null, formOpen: false });
    },
  });

  return (
    <Dialog open fullWidth maxWidth="md">
      <Form methods={form} onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
        <SetValues />
        <DialogTitle>Add Permission</DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            py: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Field.Text name="nameUz" label="Name Uz" required />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Field.Text name="nameRu" label="Name Ru" required />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Field.AutocompleteMatchId
                fullWidth
                name="permissionGroupId"
                label="Permission Group"
                placeholder="Choose a permission group"
                options={permissionGroups.map((permissionGroup) => ({
                  label: permissionGroup.nameUz,
                  id: permissionGroup.id,
                }))}
              />
            </Grid>
            <Grid size={6}>
              <Field.AutocompleteMatchId
                fullWidth
                name="resource"
                label="Resource"
                placeholder="Choose a resource"
                options={resourcesList.map((r) => ({
                  label: r.name,
                  id: r.endpoint,
                }))}
                customOnChange={() => {
                  form.setValue('action', defaultValues.action);
                }}
              />
            </Grid>

            <Grid size={6}>
              <Field.AutocompleteMatchId
                fullWidth
                name="action"
                label="Action"
                placeholder="Choose a action"
                options={actions}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="soft"
            type="reset"
            onClick={() => setQueryStates({ permissionId: null, formOpen: false })}
          >
            Cancel
          </Button>
          <Button
            loading={form.formState.isSubmitting}
            variant="contained"
            color="black"
            type="submit"
          >
            Save
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
