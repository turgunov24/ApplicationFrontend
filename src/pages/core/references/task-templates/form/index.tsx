import type { IForm } from './form';

import { useForm, useWatch } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseAsInteger, useQueryStates, parseAsBoolean } from 'nuqs';

import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { RoleBasedGuard } from 'src/auth/guard';

import SetValues from './setValues';
import { IFormSchema, defaultValues } from './form';
import { referencesTaskTemplatesPermissions } from '../helpers/permissions';
import { referencesTaskTemplatesService, REFERENCES_TASK_TEMPLATES_BASE_QUERY_KEY } from '../services';

const recurrenceOptions = [
  { value: 'once', label: 'Once' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'fiscalQuarter', label: 'Fiscal Quarter' },
  { value: 'yearly', label: 'Yearly' },
];

const monthOfQuarterOptions = [
  { value: 1, label: '1 (January, April, July, October)' },
  { value: 2, label: '2 (February, May, August, November)' },
  { value: 3, label: '3 (March, June, September, December)' },
];

const monthOfYearOptions = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: new Date(2026, i, 1).toLocaleString('en-US', { month: 'long' }),
}));

const dayOfMonthOptions = Array.from({ length: 31 }, (_, i) => ({
  value: i + 1,
  label: String(i + 1),
}));

export default function FormComponent() {
  const [{ taskTemplateId }, setQueryStates] = useQueryStates(
    {
      taskTemplateId: parseAsInteger,
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

  const recurrence = useWatch({ control: form.control, name: 'recurrence' });

  const { mutateAsync } = useMutation({
    mutationKey: [REFERENCES_TASK_TEMPLATES_BASE_QUERY_KEY, 'save'],
    mutationFn: async (values: IForm) => {
      const payload: IForm = {
        translationKey: values.translationKey,
        description: values.description ?? '',
        recurrence: values.recurrence,
        date: values.date,
        dayOfMonth: values.dayOfMonth,
        monthOfQuarter: values.monthOfQuarter,
        monthOfYear: values.monthOfYear,
      };

      if (taskTemplateId) {
        const response = await referencesTaskTemplatesService.form.update(Number(taskTemplateId), payload);
        return response;
      }
      const response = await referencesTaskTemplatesService.form.create(payload);
      return response;
    },
    onSuccess: () => {
      toast.success(taskTemplateId ? 'Update success!' : 'Create success!');
      setQueryStates({ taskTemplateId: null, formOpen: false });
    },
  });

  return (
    <Dialog open fullWidth>
      <RoleBasedGuard
        allowedPermissions={[
          taskTemplateId ? referencesTaskTemplatesPermissions.update : referencesTaskTemplatesPermissions.create,
        ]}
      >
        <Form methods={form} onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
          <SetValues />
          <DialogTitle>Add Task Template</DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              py: 2,
            }}
          >
            <Grid container gap={2}>
              <Grid size={{ xs: 12 }}>
                <Field.Text name="translationKey" label="Translation Key" required />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field.Text name="description" label="Description" multiline rows={3} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field.Select name="recurrence" label="Recurrence" required>
                  {recurrenceOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field.Select>
              </Grid>

              {recurrence === 'once' && (
                <Grid size={{ xs: 12 }}>
                  <Field.DatePicker name="date" label="Date" />
                </Grid>
              )}

              {recurrence === 'fiscalQuarter' && (
                <Grid size={{ xs: 12 }}>
                  <Field.Select name="monthOfQuarter" label="Month of Quarter" required>
                    {monthOfQuarterOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field.Select>
                </Grid>
              )}

              {recurrence === 'yearly' && (
                <Grid size={{ xs: 12 }}>
                  <Field.Select name="monthOfYear" label="Month of Year" required>
                    {monthOfYearOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field.Select>
                </Grid>
              )}

              {(recurrence === 'monthly' || recurrence === 'fiscalQuarter' || recurrence === 'yearly') && (
                <Grid size={{ xs: 12 }}>
                  <Field.Select name="dayOfMonth" label="Day of Month" required>
                    {dayOfMonthOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field.Select>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              variant="soft"
              type="reset"
              onClick={() => setQueryStates({ taskTemplateId: null, formOpen: false })}
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
