import type { IForm } from './form';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { referencesCountriesService, REFERENCES_COUNTRIES_BASE_QUERY_KEY } from '../services';

const SetValues = () => {
  const [countryId] = useQueryState('countryId');

  const form = useFormContext<IForm>();
  const queryClient = useQueryClient();

  useQuery({
    enabled: !!countryId,
    queryKey: [REFERENCES_COUNTRIES_BASE_QUERY_KEY, 'get', countryId],
    queryFn: async () => {
      const response = await referencesCountriesService.form.get(Number(countryId));

      if (response) {
        form.setValue('nameUz', response.nameUz);
        form.setValue('nameRu', response.nameRu);
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [REFERENCES_COUNTRIES_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
