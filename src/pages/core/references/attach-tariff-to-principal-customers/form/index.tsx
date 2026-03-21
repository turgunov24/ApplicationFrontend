import type { IForm } from './form';

import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { parseAsBoolean, useQueryStates } from 'nuqs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation } from '@tanstack/react-query';

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

import { RoleBasedGuard } from 'src/auth/guard';

import SetValues from './setValues';
import { IFormSchema, defaultValues } from './form';
import { attachTariffToPrincipalCustomersPermissions } from '../helpers/permissions';
import {
  referencesTariffsService,
  REFERENCES_TARIFFS_BASE_QUERY_KEY,
} from '../../tariffs/services';
import {
  attachTariffToPrincipalCustomersService,
  ATTACH_TARIFF_TO_PRINCIPAL_CUSTOMERS_BASE_QUERY_KEY,
} from '../services';

export default function FormComponent() {
  const [, setQueryStates] = useQueryStates(
    {
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

  const { data: principalCustomersList = [] } = useList({ listType: 'principalCustomers' });

  const { data: tariffsList = [] } = useQuery({
    queryKey: [REFERENCES_TARIFFS_BASE_QUERY_KEY, 'list'],
    queryFn: async () => {
      const response = await referencesTariffsService.helpers.list();
      return response;
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: [ATTACH_TARIFF_TO_PRINCIPAL_CUSTOMERS_BASE_QUERY_KEY, 'save'],
    mutationFn: async (values: IForm) => {
      const response = await attachTariffToPrincipalCustomersService.form.create(values);
      return response;
    },
    onSuccess: () => {
      toast.success('Create success!');
      setQueryStates({ formOpen: false });
    },
  });

  return (
    <Dialog open fullWidth>
      <RoleBasedGuard
        allowedPermissions={[
          attachTariffToPrincipalCustomersPermissions.create,
        ]}
      >
        <Form methods={form} onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
          <SetValues />
          <DialogTitle>Attach Tariff</DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              py: 2,
            }}
          >
            <Grid container gap={2}>
              <Grid size={{ xs: 12 }}>
                <Field.AutocompleteMatchId
                  fullWidth
                  name="principalCustomerId"
                  label="Principal Customer"
                  placeholder="Choose a principal customer"
                  options={principalCustomersList.map((pc) => ({
                    id: pc.id,
                    label: pc.name,
                  }))}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field.AutocompleteMatchId
                  fullWidth
                  name="tariffId"
                  label="Tariff"
                  placeholder="Choose a tariff"
                  options={tariffsList.map((tariff) => ({
                    id: tariff.id,
                    label: tariff.nameUz,
                  }))}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field.DatePicker name="startDate" label="Start Date" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field.DatePicker
                  name="endDate"
                  label="End Date"
                  maxDate={dayjs()}
                  slotProps={{
                    textField: {
                      helperText: 'Agar ko\'rsatilmagan bo\'lsa, tarif muddatsiz (yoki yangi tarif tayinlangunga qadar) amal qiladi.',
                    },
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              variant="soft"
              type="reset"
              onClick={() => setQueryStates({ formOpen: false })}
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
