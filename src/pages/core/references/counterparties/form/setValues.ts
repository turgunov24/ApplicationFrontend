import type { IForm } from './form';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { referencesCounterpartiesService, REFERENCES_COUNTERPARTIES_BASE_QUERY_KEY } from '../services';

const SetValues = () => {
  const [counterpartyId] = useQueryState('counterpartyId');

  const form = useFormContext<IForm>();
  const queryClient = useQueryClient();

  useQuery({
    enabled: !!counterpartyId,
    queryKey: [REFERENCES_COUNTERPARTIES_BASE_QUERY_KEY, 'get', counterpartyId],
    queryFn: async () => {
      const response = await referencesCounterpartiesService.form.get(Number(counterpartyId));

      if (response) {
        form.setValue('name', response.name);
        form.setValue('phone', response.phone);
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [REFERENCES_COUNTERPARTIES_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
