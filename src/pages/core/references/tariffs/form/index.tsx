import type { IForm } from './form';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
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
import { referencesTariffsPermissions } from '../helpers/permissions';
import { referencesCurrenciesService } from '../../currencies/services';
import { referencesTariffsService, REFERENCES_TARIFFS_BASE_QUERY_KEY } from '../services';

export default function FormComponent() {
  const [{ tariffId }, setQueryStates] = useQueryStates(
    {
      tariffId: parseAsInteger,
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

  const { data: currencies = [] } = useQuery({
    queryKey: [REFERENCES_TARIFFS_BASE_QUERY_KEY, 'currencies-list'],
    queryFn: async () => {
      const response = await referencesCurrenciesService.helpers.list();
      return response;
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: [REFERENCES_TARIFFS_BASE_QUERY_KEY, 'save'],
    mutationFn: async (values: IForm) => {
      const payload = {
        nameUz: values.nameUz,
        nameRu: values.nameRu,
        monthlyPrice: values.monthlyPrice,
        currencyId: values.currencyId?.id ?? 0,
      };

      if (tariffId) {
        const response = await referencesTariffsService.form.update(Number(tariffId), payload);
        return response;
      }
      const response = await referencesTariffsService.form.create(payload);
      return response;
    },
    onSuccess: () => {
      toast.success(tariffId ? 'Update success!' : 'Create success!');
      setQueryStates({ tariffId: null, formOpen: false });
    },
  });

  return (
    <Dialog open fullWidth>
      <RoleBasedGuard
        allowedPermissions={[
          tariffId ? referencesTariffsPermissions.update : referencesTariffsPermissions.create,
        ]}
      >
        <Form methods={form} onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
          <SetValues />
          <DialogTitle>Add Tariff</DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              py: 2,
            }}
          >
            <Grid container gap={2}>
              <Grid size={{ xs: 12 }}>
                <Field.Text name="nameUz" label="Name Uz" required />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field.Text name="nameRu" label="Name Ru" required />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field.Text
                  name="monthlyPrice"
                  label="Monthly Price"
                  placeholder="0"
                  type="number"
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field.Autocomplete
                  fullWidth
                  name="currencyId"
                  label="Currency"
                  placeholder="Choose a currency"
                  options={currencies.map((currency) => ({
                    label: currency.nameUz,
                    id: currency.id,
                  }))}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              variant="soft"
              type="reset"
              onClick={() => setQueryStates({ tariffId: null, formOpen: false })}
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
