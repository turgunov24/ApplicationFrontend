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
        form.setValue('counterpartyId', response.data.counterpartyId);
        form.setValue('legalFormId', response.data.legalFormId);
        form.setValue('inn', response.data.inn);
        if (response.data.espExpireDate) {
          form.setValue('espExpireDate', new Date(response.data.espExpireDate));
        }
        if (response.data.espPath) {
          const url = new URL(response.data.espPath, import.meta.env.VITE_SERVER_URL);
          const espKeyResponse = await principalCustomersService.helpers.getEspKey(url.toString());
          if (espKeyResponse.status === HttpStatusCode.Ok) {
            const blob = espKeyResponse.data;
            const filename = response.data.espPath.split('/').pop() || 'esp-key';
            const file = new File([blob], filename, { type: blob.type || 'application/octet-stream' });
            form.setValue('espFile', file);
          }
        }
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
