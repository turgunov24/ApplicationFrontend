import type { IForm } from './form';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { referencesCurrenciesService } from '../../currencies/services';
import { referencesTariffsService, REFERENCES_TARIFFS_BASE_QUERY_KEY } from '../services';

const SetValues = () => {
  const [tariffId] = useQueryState('tariffId');

  const form = useFormContext<IForm>();
  const queryClient = useQueryClient();

  const { data: currencies = [] } = useQuery({
    queryKey: [REFERENCES_TARIFFS_BASE_QUERY_KEY, 'currencies-list'],
    queryFn: async () => {
      const response = await referencesCurrenciesService.helpers.list();
      return response;
    },
  });

  useQuery({
    enabled: !!tariffId && currencies.length > 0,
    queryKey: [REFERENCES_TARIFFS_BASE_QUERY_KEY, 'get', tariffId],
    queryFn: async () => {
      const response = await referencesTariffsService.form.get(Number(tariffId));

      if (response) {
        form.setValue('nameUz', response.nameUz);
        form.setValue('nameRu', response.nameRu);
        form.setValue('monthlyPrice', response.monthlyPrice);

        const currency = currencies.find((c) => c.id === response.currencyId);
        if (currency) {
          form.setValue('currencyId', {
            id: currency.id,
            label: currency.nameUz,
          });
        }
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [REFERENCES_TARIFFS_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
