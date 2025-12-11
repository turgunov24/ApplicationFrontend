import type { IForm } from './form'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useMutation } from '@tanstack/react-query'
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

import { RoleBasedGuard } from 'src/auth/guard'

import SetValues from './setValues'
import { IFormSchema, defaultValues } from './form'
import { referencesCountriesService } from '../../countries/services'
import { referencesRegionsPermissions } from '../helpers/permissions'
import { referencesRegionsService, REFERENCES_REGIONS_BASE_QUERY_KEY } from '../services'

export default function FormComponent() {
  const [{ regionId }, setQueryStates] = useQueryStates(
    {
      regionId: parseAsInteger,
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

  const { data: countries = [] } = useQuery({
    queryKey: [REFERENCES_REGIONS_BASE_QUERY_KEY, 'countries-list'],
    queryFn: async () => {
      const response = await referencesCountriesService.helpers.list();
      return response;
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: [REFERENCES_REGIONS_BASE_QUERY_KEY, 'save'],
    mutationFn: async (values: IForm) => {
      if (regionId) {
        const response = await referencesRegionsService.form.update(Number(regionId), {
          ...values,
          // @ts-expect-error object emasligi uchun error beryapti
          countryId: values.countryId.id,
        });
        return response;
      }
      const response = await referencesRegionsService.form.create({
        ...values,
        // @ts-expect-error object emasligi uchun error beryapti
        countryId: values.countryId.id,
      });
      return response;
    },
    onSuccess: () => {
      toast.success(regionId ? 'Update success!' : 'Create success!');
      setQueryStates({ regionId: null, formOpen: false });
    },
  });

  return (
    <Dialog open fullWidth>
      <RoleBasedGuard
        allowedPermissions={[
          regionId ? referencesRegionsPermissions.update : referencesRegionsPermissions.create,
        ]}
      >
        <Form methods={form} onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
          <SetValues />
          <DialogTitle>Add Region</DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            py: 2,
          }}
        >
          <Grid container gap={2}>
            <Grid size={{ xs: 12 }}>
              <Field.Autocomplete
                fullWidth
                name="countryId"
                label="Country"
                placeholder="Choose a country"
                options={countries.map((country) => ({
                  label: country.nameUz,
                  id: country.id,
                }))}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Field.Text name="nameUz" label="Name Uz" required />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Field.Text name="nameRu" label="Name Ru" required />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="soft"
            type="reset"
            onClick={() => setQueryStates({ regionId: null, formOpen: false })}
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
