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
import { referencesCurrenciesPermissions } from '../helpers/permissions';
import { referencesCurrenciesService, REFERENCES_CURRENCIES_BASE_QUERY_KEY } from '../services';

export default function FormComponent() {
  const [{ currencyId }, setQueryStates] = useQueryStates(
    {
      currencyId: parseAsInteger,
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
    mutationKey: [REFERENCES_CURRENCIES_BASE_QUERY_KEY, 'save'],
    mutationFn: async (values: IForm) => {
      if (currencyId) {
        const response = await referencesCurrenciesService.form.update(Number(currencyId), values);
        return response;
      }
      const response = await referencesCurrenciesService.form.create(values);
      return response;
    },
    onSuccess: () => {
      toast.success(currencyId ? 'Update success!' : 'Create success!');
      setQueryStates({ currencyId: null, formOpen: false });
    },
  });

  return (
    <Dialog open fullWidth>
      <RoleBasedGuard
        allowedPermissions={[
          currencyId
            ? referencesCurrenciesPermissions.update
            : referencesCurrenciesPermissions.create,
        ]}
      >
        <Form methods={form} onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
          <SetValues />
          <DialogTitle>Add Currency</DialogTitle>
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
              onClick={() => setQueryStates({ currencyId: null, formOpen: false })}
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
