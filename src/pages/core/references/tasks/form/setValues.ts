import type { IForm } from './form';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { referencesTasksService, REFERENCES_TASKS_BASE_QUERY_KEY } from '../services';

const SetValues = () => {
  const [taskId] = useQueryState('taskId');

  const form = useFormContext<IForm>();
  const queryClient = useQueryClient();

  useQuery({
    enabled: !!taskId,
    queryKey: [REFERENCES_TASKS_BASE_QUERY_KEY, 'get', taskId],
    queryFn: async () => {
      const response = await referencesTasksService.form.get(Number(taskId));

      if (response) {
        form.setValue('translationKey', response.translationKey);
        form.setValue('description', response.description ?? '');
        form.setValue('deadline', response.deadline ? new Date(response.deadline) : null);
        form.setValue('principalCustomerId', response.principalCustomerId);
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [REFERENCES_TASKS_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
