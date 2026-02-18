import type { IForm } from './form';

import { useEffect } from 'react';
import { HttpStatusCode } from 'axios';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useParams } from 'src/routes/hooks';

import { principalCustomersService, PRINCIPAL_CUSTOMERS_BASE_QUERY_KEY } from '../services';

const SetValues = () => {
  const { id } = useParams();
  const form = useFormContext<IForm>();
  const queryClient = useQueryClient();

  useQuery({
    enabled: !!id,
    queryKey: [PRINCIPAL_CUSTOMERS_BASE_QUERY_KEY, 'get', id],
    queryFn: async () => {
      const response = await principalCustomersService.form.get(Number(id));

      if (response.status === HttpStatusCode.Ok) {
        form.setValue('name', response.data.name);
        form.setValue('principalId', response.data.principalId);
        form.setValue('clientTypeId', response.data.clientTypeId);
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [PRINCIPAL_CUSTOMERS_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
