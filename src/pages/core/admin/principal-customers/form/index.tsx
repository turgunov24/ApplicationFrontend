import type { IForm } from './form';

import { HttpStatusCode } from 'axios';
import { omit } from 'es-toolkit/compat';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { useParams, useRouter } from 'src/routes/hooks';

import useList from 'src/hooks/useList/v1/Index';

import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import SetValues from './setValues';
import { IFormSchema, defaultValues } from './form';
import { principalCustomersService, PRINCIPAL_CUSTOMERS_BASE_QUERY_KEY } from '../services';

export default function FormPage() {
  const router = useRouter();
  const { id } = useParams();

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(IFormSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const { mutate, isPending } = useMutation({
    mutationKey: [PRINCIPAL_CUSTOMERS_BASE_QUERY_KEY, 'save'],
    mutationFn: async (formData: IForm) => {
      if (id) {
        const response = await principalCustomersService.form.update(
          Number(id),
          omit(formData, ['espFile'])
        );

        if (response.status === HttpStatusCode.Ok) {
          const espKeyResponse = await principalCustomersService.helpers.uploadEspKey(
            Number(id),
            formData.espFile as File
          );
          if (espKeyResponse.status === HttpStatusCode.Created) {
            return response;
          }
        }
      } else {
        const response = await principalCustomersService.form.create(omit(formData, ['espFile']));
        if (response.status === HttpStatusCode.Created) {
          const espKeyResponse = await principalCustomersService.helpers.uploadEspKey(
            response.data.id,
            formData.espFile as File
          );
          if (espKeyResponse.status === HttpStatusCode.Created) {
            return response;
          }
        }
      }
      return false;
    },
    onSuccess: () => {
      toast.success(id ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.principalCustomers.root);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      mutate(data);
    } catch (error) {
      console.error(error);
    }
  });

  const { data: principalsList = [] } = useList({ listType: 'principals' });
  const { data: clientTypesList = [] } = useList({ listType: 'clientTypes' });
  const { data: counterpartiesList = [] } = useList({ listType: 'counterparties' });
  const { data: legalFormsList = [] } = useList({ listType: 'legalForms' });

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={id ? 'Update principal customer' : 'Create a new principal customer'}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Principal Customers', href: paths.dashboard.principalCustomers.root },
          { name: id ? 'Update' : 'Create' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Form methods={methods} onSubmit={onSubmit}>
        <Card sx={{ p: 3 }}>
          <Box
            sx={{
              rowGap: 3,
              columnGap: 2,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            <Field.Text name="name" label="Name" />

            <Field.AutocompleteMatchId
              fullWidth
              name="principalId"
              label="Principal"
              placeholder="Choose a principal"
              options={principalsList.map((principal) => ({
                id: principal.id,
                label: principal.fullName,
              }))}
            />

            <Field.AutocompleteMatchId
              fullWidth
              name="clientTypeId"
              label="Client Type"
              placeholder="Choose a client type"
              options={clientTypesList.map((clientType) => ({
                id: clientType.id,
                label: clientType.nameUz,
              }))}
            />

            <Field.AutocompleteMatchId
              fullWidth
              name="counterpartyId"
              label="Counterparty"
              placeholder="Choose a counterparty"
              options={counterpartiesList.map((counterparty) => ({
                id: counterparty.id,
                label: counterparty.name,
              }))}
            />

            <Field.AutocompleteMatchId
              fullWidth
              name="legalFormId"
              label="Legal Form"
              placeholder="Choose a legal form"
              options={legalFormsList.map((legalForm) => ({
                id: legalForm.id,
                label: legalForm.name,
              }))}
            />

            <Field.Text
              name="inn"
              label="INN"
              type="number"
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <Field.DatePicker name="espExpireDate" label="ESP Expire Date" />

            <Field.Upload name="espFile" />
          </Box>

          <Stack sx={{ mt: 3, alignItems: 'flex-end' }}>
            <Button type="submit" variant="contained" loading={isPending}>
              {id ? 'Update' : 'Create'}
            </Button>
          </Stack>
        </Card>
        <SetValues />
      </Form>
    </DashboardContent>
  );
}
