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

import useList from 'src/hooks/useList/v1/Index';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { RoleBasedGuard } from 'src/auth/guard';

import SetValues from './setValues';
import { IFormSchema, defaultValues } from './form';
import { referencesPrincipalCustomerCredentialsPermissions } from '../helpers/permissions';
import {
  referencesPrincipalCustomerCredentialsService,
  REFERENCES_PRINCIPAL_CUSTOMER_CREDENTIALS_BASE_QUERY_KEY,
} from '../services';

export default function FormComponent() {
  const [{ credentialId }, setQueryStates] = useQueryStates(
    {
      credentialId: parseAsInteger,
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

  const { data: servicesList = [] } = useList({ listType: 'services' });
  const { data: principalCustomersList = [] } = useList({ listType: 'principalCustomers' });

  const { mutateAsync } = useMutation({
    mutationKey: [REFERENCES_PRINCIPAL_CUSTOMER_CREDENTIALS_BASE_QUERY_KEY, 'save'],
    mutationFn: async (values: IForm) => {
      if (credentialId) {
        const response = await referencesPrincipalCustomerCredentialsService.form.update(Number(credentialId), values);
        return response;
      }
      const response = await referencesPrincipalCustomerCredentialsService.form.create(values);
      return response;
    },
    onSuccess: () => {
      toast.success(credentialId ? 'Update success!' : 'Create success!');
      setQueryStates({ credentialId: null, formOpen: false });
    },
  });

  return (
    <Dialog open fullWidth>
      <RoleBasedGuard
        allowedPermissions={[
          credentialId
            ? referencesPrincipalCustomerCredentialsPermissions.update
            : referencesPrincipalCustomerCredentialsPermissions.create,
        ]}
      >
        <Form methods={form} onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
          <SetValues />
          <DialogTitle>Add Credential</DialogTitle>
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
                  name="serviceId"
                  label="Service"
                  placeholder="Choose a service"
                  options={servicesList.map((service) => ({
                    id: service.id,
                    label: service.name,
                  }))}
                />
              </Grid>
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
                <Field.Text name="username" label="Username" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field.Text name="password" label="Password" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field.Text name="additionalInformationUz" label="Additional Information (UZ)" multiline rows={3} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field.Text name="additionalInformationRu" label="Additional Information (RU)" multiline rows={3} />
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              variant="soft"
              type="reset"
              onClick={() => setQueryStates({ credentialId: null, formOpen: false })}
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
