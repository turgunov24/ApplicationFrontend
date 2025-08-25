import type { IForm } from './form';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation } from '@tanstack/react-query';
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
import { referencesRegionsService } from '../../regions/services';
import { referencesDistrictsService, REFERENCES_DISTRICTS_BASE_QUERY_KEY } from '../services';

export default function FormComponent() {
  const [{ districtId }, setQueryStates] = useQueryStates(
    {
      districtId: parseAsInteger,
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

  const { data: regions = [] } = useQuery({
    queryKey: [REFERENCES_DISTRICTS_BASE_QUERY_KEY, 'regions-list'],
    queryFn: async () => {
      const response = await referencesRegionsService.helpers.list();
      return response;
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: [REFERENCES_DISTRICTS_BASE_QUERY_KEY, 'save'],
    mutationFn: async (values: IForm) => {
      if (districtId) {
        const response = await referencesDistrictsService.form.update(Number(districtId), {
          ...values,
          // @ts-expect-error object emasligi uchun error beryapti
          regionId: values.regionId.id,
        });
        return response;
      }
      const response = await referencesDistrictsService.form.create({
        ...values,
        // @ts-expect-error object emasligi uchun error beryapti
        regionId: values.regionId.id,
      });
      return response;
    },
    onSuccess: () => {
      toast.success(districtId ? 'Update success!' : 'Create success!');
      setQueryStates({ districtId: null, formOpen: false });
    },
  });

  return (
    <Dialog open fullWidth>
      <Form methods={form} onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
        <SetValues />
        <DialogTitle>Add District</DialogTitle>
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
                name="regionId"
                label="Region"
                placeholder="Choose a region"
                options={regions.map((region) => ({
                  label: region.nameUz,
                  id: region.id,
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
            onClick={() => setQueryStates({ districtId: null, formOpen: false })}
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
