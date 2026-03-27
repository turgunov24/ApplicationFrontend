import type { IForm } from './form';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { referencesTranslationsService, REFERENCES_TRANSLATIONS_BASE_QUERY_KEY } from '../services';

const SetValues = () => {
  const [translationId] = useQueryState('translationId');

  const form = useFormContext<IForm>();
  const queryClient = useQueryClient();

  useQuery({
    enabled: !!translationId,
    queryKey: [REFERENCES_TRANSLATIONS_BASE_QUERY_KEY, 'get', translationId],
    queryFn: async () => {
      const response = await referencesTranslationsService.form.get(Number(translationId));

      if (response) {
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
      queryClient.invalidateQueries({ queryKey: [REFERENCES_TRANSLATIONS_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
