import type { IForm } from './form';

import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { attachTemplateToTaskService, ATTACH_TEMPLATE_TO_TASK_BASE_QUERY_KEY } from '../services';

const SetValues = () => {
  const [attachTemplateToTaskId] = useQueryState('attachTemplateToTaskId');

  const form = useFormContext<IForm>();
  const queryClient = useQueryClient();

  useQuery({
    enabled: !!attachTemplateToTaskId,
    queryKey: [ATTACH_TEMPLATE_TO_TASK_BASE_QUERY_KEY, 'get', attachTemplateToTaskId],
    queryFn: async () => {
      const response = await attachTemplateToTaskService.form.get(Number(attachTemplateToTaskId));

      if (response) {
        form.setValue('principalCustomerId', response.principalCustomerId);
        // @ts-expect-error backend qaytaradigan obyektda taskTemplateId keladi, form esa array kutadi
        form.setValue('taskTemplateIds', response.taskTemplateId ? [response.taskTemplateId] : []);
        form.setValue('startDate', response.startDate);
        form.setValue('endDate', response.endDate);
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [ATTACH_TEMPLATE_TO_TASK_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
