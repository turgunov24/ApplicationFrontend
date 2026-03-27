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

import { RoleBasedGuard } from 'src/auth/guard';

import SetValues from './setValues';
import { IFormSchema, defaultValues } from './form';
import { referencesTranslationsPermissions } from '../helpers/permissions';
import { referencesTranslationsService, REFERENCES_TRANSLATIONS_BASE_QUERY_KEY } from '../services';

export default function FormComponent() {
  const [{ translationId }, setQueryStates] = useQueryStates(
    {
      translationId: parseAsInteger,
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
    mutationKey: [REFERENCES_TRANSLATIONS_BASE_QUERY_KEY, 'save'],
    mutationFn: async (values: IForm) => {
      if (translationId) {
        const response = await referencesTranslationsService.form.update(Number(translationId), values);
        return response;
      }
      const response = await referencesTranslationsService.form.create(values);
      return response;
    },
    onSuccess: () => {
      toast.success(translationId ? 'Update success!' : 'Create success!');
      setQueryStates({ translationId: null, formOpen: false });
    },
  });

  return (
    <Dialog open fullWidth>
      <RoleBasedGuard
        allowedPermissions={[
          translationId
            ? referencesTranslationsPermissions.update
            : referencesTranslationsPermissions.create,
        ]}
      >
        <Form methods={form} onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
          <SetValues />
          <DialogTitle>Add Translation</DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              py: 2,
            }}
          >
            <Grid container gap={2}>
              <Grid size={{ xs: 12 }}>
                <Field.Text name="lang" label="Lang" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field.Text name="namespace" label="Namespace" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field.Text name="key" label="Key" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field.Text name="value" label="Value" />
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              variant="soft"
              type="reset"
              onClick={() => setQueryStates({ translationId: null, formOpen: false })}
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
      </RoleBasedGuard>
    </Dialog>
  );
}
