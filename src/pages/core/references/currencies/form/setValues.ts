import type { IForm } from './form';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { referencesCurrenciesService, REFERENCES_CURRENCIES_BASE_QUERY_KEY } from '../services';

const SetValues = () => {
  const [currencyId] = useQueryState('currencyId');

  const form = useFormContext<IForm>();
  const queryClient = useQueryClient();

  useQuery({
    enabled: !!currencyId,
    queryKey: [REFERENCES_CURRENCIES_BASE_QUERY_KEY, 'get', currencyId],
    queryFn: async () => {
      const response = await referencesCurrenciesService.form.get(Number(currencyId));

      if (response) {
        form.setValue('nameUz', response.nameUz);
        form.setValue('nameRu', response.nameRu);
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [REFERENCES_CURRENCIES_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
