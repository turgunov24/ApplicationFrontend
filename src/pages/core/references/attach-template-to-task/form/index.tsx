import type { IForm } from './form';

import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseAsBoolean, parseAsInteger, useQueryStates } from 'nuqs';

import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { FormHelperText } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import useList from 'src/hooks/useList/v1/Index';

import { toast } from 'src/components/snackbar';
import { Scrollbar } from 'src/components/scrollbar';
import { Form, Field } from 'src/components/hook-form';

import { RoleBasedGuard } from 'src/auth/guard';

import SetValues from './setValues';
import { IFormSchema, defaultValues } from './form';
import { attachTemplateToTaskPermissions } from '../helpers/permissions';
import { attachTemplateToTaskService, ATTACH_TEMPLATE_TO_TASK_BASE_QUERY_KEY } from '../services';

export default function FormComponent() {
  const [{ attachTemplateToTaskId }, setQueryStates] = useQueryStates(
    {
      formOpen: parseAsBoolean,
      attachTemplateToTaskId: parseAsInteger,
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
  const { data: taskTemplatesList = [] } = useList({ listType: 'taskTemplates' });

  const { mutateAsync } = useMutation({
    mutationKey: [ATTACH_TEMPLATE_TO_TASK_BASE_QUERY_KEY, 'save'],
    mutationFn: async (values: IForm) => {
      if (attachTemplateToTaskId) {
        const response = await attachTemplateToTaskService.form.update(
          Number(attachTemplateToTaskId),
          values
        );
        return response;
      }
      const response = await attachTemplateToTaskService.form.create(values);
      return response;
    },
    onSuccess: () => {
      toast.success(attachTemplateToTaskId ? 'Update success!' : 'Create success!');
      setQueryStates({ formOpen: false, attachTemplateToTaskId: null });
    },
  });

  const selectedTemplateIds = form.watch('taskTemplateIds') || [];

  const handleToggleTemplate = (id: number) => {
    const currentIndex = selectedTemplateIds.indexOf(id);
    const newSelected = [...selectedTemplateIds];

    if (currentIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    form.setValue('taskTemplateIds', newSelected, { shouldValidate: true });
  };

  const handleToggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      form.setValue(
        'taskTemplateIds',
        taskTemplatesList.map((t) => t.id),
        { shouldValidate: true }
      );
    } else {
      form.setValue('taskTemplateIds', [], { shouldValidate: true });
    }
  };

  return (
    <Dialog open fullWidth maxWidth="md">
      <RoleBasedGuard
        allowedPermissions={[
          attachTemplateToTaskId
            ? attachTemplateToTaskPermissions.update
            : attachTemplateToTaskPermissions.create,
        ]}
      >
        <Form methods={form} onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
          <SetValues />
          <DialogTitle>Attach Template to Task</DialogTitle>
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
                <Field.DatePicker name="startDate" label="Start Date" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Field.DatePicker name="endDate" label="End Date" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Task Templates
                </Typography>
                <Scrollbar
                  sx={{
                    maxHeight: 300,
                    border: (theme) => `solid 1px ${theme.palette.divider}`,
                    borderRadius: 1,
                  }}
                >
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            indeterminate={
                              selectedTemplateIds.length > 0 &&
                              selectedTemplateIds.length < taskTemplatesList.length
                            }
                            checked={
                              taskTemplatesList.length > 0 &&
                              selectedTemplateIds.length === taskTemplatesList.length
                            }
                            onChange={handleToggleAll}
                          />
                        </TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Translation Key</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {taskTemplatesList.map((row) => {
                        const isItemSelected = selectedTemplateIds.indexOf(row.id) !== -1;
                        return (
                          <TableRow
                            hover
                            onClick={() => handleToggleTemplate(row.id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                            sx={{ cursor: 'pointer' }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox checked={isItemSelected} />
                            </TableCell>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.translationKey}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Scrollbar>
                {!!form.formState.errors.taskTemplateIds && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {form.formState.errors.taskTemplateIds.message?.toString() ||
                      form.formState.errors.taskTemplateIds.root?.message?.toString()}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              variant="soft"
              type="reset"
              onClick={() => setQueryStates({ formOpen: false, attachTemplateToTaskId: null })}
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
