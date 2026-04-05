import type { IForm } from './form';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { referencesTaskTemplatesService, REFERENCES_TASK_TEMPLATES_BASE_QUERY_KEY } from '../services';

const SetValues = () => {
  const [taskTemplateId] = useQueryState('taskTemplateId');

  const form = useFormContext<IForm>();
  const queryClient = useQueryClient();

  useQuery({
    enabled: !!taskTemplateId,
    queryKey: [REFERENCES_TASK_TEMPLATES_BASE_QUERY_KEY, 'get', taskTemplateId],
    queryFn: async () => {
      const response = await referencesTaskTemplatesService.form.get(Number(taskTemplateId));

      if (response) {
        form.setValue('translationKey', response.translationKey);
        form.setValue('description', response.description ?? '');
        form.setValue('recurrence', response.recurrence);
        form.setValue('date', response.date ? new Date(response.date) : null);
        form.setValue('dayOfMonth', response.dayOfMonth ?? null);
        form.setValue('monthOfQuarter', response.monthOfQuarter ?? null);
        form.setValue('monthOfYear', response.monthOfYear ?? null);
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [REFERENCES_TASK_TEMPLATES_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
