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

import { RoleBasedGuard } from 'src/auth/guard';

import SetValues from './setValues';
import { IFormSchema, defaultValues } from './form';
import TaskCommentsSection from './TaskCommentsSection';
import TaskActionsHistorySection from './TaskActionsHistorySection';
import { referencesTasksPermissions } from '../helpers/permissions';
import { referencesTasksService, REFERENCES_TASKS_BASE_QUERY_KEY } from '../services';
import { principalCustomersService } from '../../../admin/principal-customers/services';

export default function FormComponent() {
  const [{ taskId }, setQueryStates] = useQueryStates(
    {
      taskId: parseAsInteger,
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

  const { data: principalCustomers = [] } = useQuery({
    queryKey: [REFERENCES_TASKS_BASE_QUERY_KEY, 'principal-customers-list'],
    queryFn: async () => {
      const response = await principalCustomersService.helpers.list();
      return response;
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: [REFERENCES_TASKS_BASE_QUERY_KEY, 'save'],
    mutationFn: async (values: IForm) => {
      const payload: IForm = {
        translationKey: values.translationKey,
        description: values.description ?? '',
        deadline: values.deadline,
        principalCustomerId: values.principalCustomerId,
      };

      if (taskId) {
        const response = await referencesTasksService.form.update(Number(taskId), payload);
        return response;
      }
      const response = await referencesTasksService.form.create(payload);
      return response;
    },
    onSuccess: () => {
      toast.success(taskId ? 'Update success!' : 'Create success!');
      setQueryStates({ taskId: null, formOpen: false });
    },
  });

  return (
    <Dialog open fullWidth>
      <RoleBasedGuard
        allowedPermissions={[
          taskId ? referencesTasksPermissions.update : referencesTasksPermissions.create,
        ]}
      >
        <Form methods={form} onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
          <SetValues />
          <DialogTitle>Add Task</DialogTitle>
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
                <Field.DatePicker name="deadline" label="Deadline" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field.AutocompleteMatchId
                  fullWidth
                  name="principalCustomerId"
                  label="Principal Customer"
                  placeholder="Choose a principal customer"
                  options={principalCustomers.map((customer) => ({
                    label: customer.name,
                    id: customer.id,
                  }))}
                />
              </Grid>
            </Grid>

            {!!taskId && (
              <>
                <Divider sx={{ my: 2 }} />
                <TaskCommentsSection taskId={Number(taskId)} />
                <Divider sx={{ my: 2 }} />
                <TaskActionsHistorySection taskId={Number(taskId)} />
              </>
            )}
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              variant="soft"
              type="reset"
              onClick={() => setQueryStates({ taskId: null, formOpen: false })}
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
