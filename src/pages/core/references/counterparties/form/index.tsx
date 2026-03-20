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
import { referencesCounterpartiesPermissions } from '../helpers/permissions';
import { referencesCounterpartiesService, REFERENCES_COUNTERPARTIES_BASE_QUERY_KEY } from '../services';

export default function FormComponent() {
  const [{ counterpartyId }, setQueryStates] = useQueryStates(
    {
      counterpartyId: parseAsInteger,
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
    mutationKey: [REFERENCES_COUNTERPARTIES_BASE_QUERY_KEY, 'save'],
    mutationFn: async (values: IForm) => {
      if (counterpartyId) {
        const response = await referencesCounterpartiesService.form.update(
          Number(counterpartyId),
          values
        );
        return response;
      }
      const response = await referencesCounterpartiesService.form.create(values);
      return response;
    },
    onSuccess: () => {
      toast.success(counterpartyId ? 'Update success!' : 'Create success!');
      setQueryStates({ counterpartyId: null, formOpen: false });
    },
  });

  return (
    <Dialog open fullWidth>
      <RoleBasedGuard
        allowedPermissions={[
          counterpartyId
            ? referencesCounterpartiesPermissions.update
            : referencesCounterpartiesPermissions.create,
        ]}
      >
        <Form methods={form} onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
          <SetValues />
          <DialogTitle>Add Counterparty</DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              py: 2,
            }}
          >
            <Grid container gap={2}>
              <Grid size={{ xs: 12 }}>
                <Field.Text name="name" label="Name" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field.Phone
                  name="phone"
                  label="Phone number"
                  defaultCountry="UZ"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              variant="soft"
              type="reset"
              onClick={() => setQueryStates({ counterpartyId: null, formOpen: false })}
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
