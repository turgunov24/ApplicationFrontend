import type { IForm } from './form';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { referencesClientTypesService, REFERENCES_CLIENT_TYPES_BASE_QUERY_KEY } from '../services';

const SetValues = () => {
  const [clientTypeId] = useQueryState('clientTypeId');

  const form = useFormContext<IForm>();
  const queryClient = useQueryClient();

  useQuery({
    enabled: !!clientTypeId,
    queryKey: [REFERENCES_CLIENT_TYPES_BASE_QUERY_KEY, 'get', clientTypeId],
    queryFn: async () => {
      const response = await referencesClientTypesService.form.get(Number(clientTypeId));

      if (response) {
        form.setValue('nameUz', response.nameUz);
        form.setValue('nameRu', response.nameRu);
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [REFERENCES_CLIENT_TYPES_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
