import type { IForm} from './form';

import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseAsInteger, useQueryStates, parseAsBoolean } from 'nuqs'

import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import { toast } from 'src/components/snackbar'
import { Form, Field } from 'src/components/hook-form'

import SetValues from './setValues'
import { IFormSchema, defaultValues } from './form'
import { referencesPermissionGroupsService, REFERENCES_PERMISSION_GROUPS_BASE_QUERY_KEY } from '../services'

export default function FormComponent() {
  const [{ permissionGroupId }, setQueryStates] = useQueryStates(
    {
      permissionGroupId: parseAsInteger,
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

  const { mutateAsync } = useMutation({
    mutationKey: [REFERENCES_PERMISSION_GROUPS_BASE_QUERY_KEY, 'save'],
    mutationFn: async (values: IForm) => {
      if (permissionGroupId) {
        const response = await referencesPermissionGroupsService.form.update(Number(permissionGroupId), values);
        return response;
      }
      const response = await referencesPermissionGroupsService.form.create(values);
      return response;
    },
    onSuccess: () => {
      toast.success(permissionGroupId ? 'Update success!' : 'Create success!');
      setQueryStates({ permissionGroupId: null, formOpen: false });
    },
  });

  return (
    <Dialog open fullWidth>
      <Form methods={form} onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
        <SetValues />
        <DialogTitle>Add Permission Group</DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            py: 2,
          }}
        >
          <Grid container gap={2}>
            <Grid size={{ xs: 12 }}>
              <Field.Text name="nameUz" label="Name Uz" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Field.Text name="nameRu" label="Name Ru" />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="soft"
            type="reset"
            onClick={() => setQueryStates({ permissionGroupId: null, formOpen: false })}
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
