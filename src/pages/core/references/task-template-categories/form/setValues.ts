import type { IForm } from './form';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { referencesTaskTemplateCategoriesService, REFERENCES_TASK_TEMPLATE_CATEGORIES_BASE_QUERY_KEY } from '../services';

const SetValues = () => {
  const [taskTemplateCategoryId] = useQueryState('taskTemplateCategoryId');

  const form = useFormContext<IForm>();
  const queryClient = useQueryClient();

  useQuery({
    enabled: !!taskTemplateCategoryId,
    queryKey: [REFERENCES_TASK_TEMPLATE_CATEGORIES_BASE_QUERY_KEY, 'get', taskTemplateCategoryId],
    queryFn: async () => {
      const response = await referencesTaskTemplateCategoriesService.form.get(Number(taskTemplateCategoryId));

      if (response) {
        form.setValue('translationKey', response.translationKey);
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [REFERENCES_TASK_TEMPLATE_CATEGORIES_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
