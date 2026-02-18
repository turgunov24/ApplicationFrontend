import type { IForm } from './form';

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
        const response = await principalCustomersService.form.update(Number(id), formData);
        return response;
      }
      const response = await principalCustomersService.form.create(formData);
      return response;
    },
    onSuccess: () => {
      toast.success(id ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.principalCustomers.root);
    },
    onError: () => {
      toast.error(id ? 'Update failed!' : 'Create failed!');
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
