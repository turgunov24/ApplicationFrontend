import type { IForm } from './form';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { referencesTaskRecurrenceService, REFERENCES_TASK_RECURRENCE_BASE_QUERY_KEY } from '../services';

const SetValues = () => {
  const [taskRecurrenceId] = useQueryState('taskRecurrenceId');

  const form = useFormContext<IForm>();
  const queryClient = useQueryClient();

  useQuery({
    enabled: !!taskRecurrenceId,
    queryKey: [REFERENCES_TASK_RECURRENCE_BASE_QUERY_KEY, 'get', taskRecurrenceId],
    queryFn: async () => {
      const response = await referencesTaskRecurrenceService.form.get(Number(taskRecurrenceId));

      if (response) {
        form.setValue('translationKey', response.translationKey);
        form.setValue('token', response.token);
        form.setValue('description', response.description ?? '');
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [REFERENCES_TASK_RECURRENCE_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
