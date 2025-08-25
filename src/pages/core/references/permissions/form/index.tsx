import type { IForm } from './form';

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

  const { data: permissionGroups = [] } = useQuery({
    queryKey: [REFERENCES_PERMISSIONS_BASE_QUERY_KEY, 'permission-groups-list'],
    queryFn: async () => {
      const response = await referencesPermissionGroupsService.helpers.list();
      return response;
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: [REFERENCES_PERMISSIONS_BASE_QUERY_KEY, 'save'],
    mutationFn: async (values: IForm) => {
      if (permissionId) {
        const response = await referencesPermissionsService.form.update(Number(permissionId), {
          ...values,
          // @ts-expect-error object emasligi uchun error beryapti
          permissionGroupId: values.permissionGroupId.id,
        });
        return response;
      }
      const response = await referencesPermissionsService.form.create({
        ...values,
        // @ts-expect-error object emasligi uchun error beryapti
        permissionGroupId: values.permissionGroupId.id,
      });
      return response;
    },
    onSuccess: () => {
      toast.success(permissionId ? 'Update success!' : 'Create success!');
      setQueryStates({ permissionId: null, formOpen: false });
    },
  });

  return (
    <Dialog open fullWidth>
      <Form methods={form} onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
        <SetValues />
        <DialogTitle>Add Permission</DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            py: 2,
          }}
        >
          <Grid container gap={2}>
            <Grid size={{ xs: 12 }}>
              <Field.Autocomplete
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
            <Grid size={{ xs: 12 }}>
              <Field.Text name="nameUz" label="Name Uz" required />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Field.Text name="nameRu" label="Name Ru" required />
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
