import type { IForm } from './form';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { REFERENCES_ROLES_BASE_QUERY_KEY, referencesRolesService } from '../services';

export default function FormComponent() {
  const [{ roleId }, setQueryStates] = useQueryStates(
    {
      roleId: parseAsInteger,
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
    mutationKey: [REFERENCES_ROLES_BASE_QUERY_KEY, 'save'],
    mutationFn: async (values: IForm) => {
      if (roleId) {
        const response = await referencesRolesService.form.update(Number(roleId), values);
        return response;
      }
      const response = await referencesRolesService.form.create(values);
      return response;
    },
    onSuccess: () => {
      toast.success(roleId ? 'Update success!' : 'Create success!');
      setQueryStates({ roleId: null, formOpen: false });
    },
  });

  return (
    <Dialog open fullWidth>
      <Form methods={form} onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
        <SetValues />
        <DialogTitle>Add Role</DialogTitle>
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
            <Grid size={{ xs: 12 }}>
              <Field.Text multiline minRows={3} name="descriptionUz" label="Description Uz" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Field.Text multiline minRows={3} name="descriptionRu" label="Description Ru" />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="soft"
            type="reset"
            onClick={() => setQueryStates({ roleId: null, formOpen: false })}
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
