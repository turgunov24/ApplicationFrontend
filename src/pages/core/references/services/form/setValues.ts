import type { IForm } from './form';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  referencesServicesService,
  REFERENCES_SERVICES_BASE_QUERY_KEY,
} from '../services';

const SetValues = () => {
  const [serviceId] = useQueryState('serviceId');

  const form = useFormContext<IForm>();
  const queryClient = useQueryClient();

  useQuery({
    enabled: !!serviceId,
    queryKey: [REFERENCES_SERVICES_BASE_QUERY_KEY, 'get', serviceId],
    queryFn: async () => {
      const response = await referencesServicesService.form.get(Number(serviceId));

      if (response) {
        form.setValue('name', response.name);
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [REFERENCES_SERVICES_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
