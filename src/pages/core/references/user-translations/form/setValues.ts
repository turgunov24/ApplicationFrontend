import type { IForm } from './form';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { referencesUserTranslationsService, REFERENCES_USER_TRANSLATIONS_BASE_QUERY_KEY } from '../services';

const SetValues = () => {
  const [userTranslationId] = useQueryState('userTranslationId');

  const form = useFormContext<IForm>();
  const queryClient = useQueryClient();

  useQuery({
    enabled: !!userTranslationId,
    queryKey: [REFERENCES_USER_TRANSLATIONS_BASE_QUERY_KEY, 'get', userTranslationId],
    queryFn: async () => {
      const response = await referencesUserTranslationsService.form.get(Number(userTranslationId));

      if (response) {
        form.setValue('userId', response.userId);
        form.setValue('lang', response.lang);
        form.setValue('namespace', response.namespace);
        form.setValue('key', response.key);
        form.setValue('value', response.value);
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [REFERENCES_USER_TRANSLATIONS_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
