import type { IForm } from './form';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  referencesPrincipalCustomerCredentialsService,
  REFERENCES_PRINCIPAL_CUSTOMER_CREDENTIALS_BASE_QUERY_KEY,
} from '../services';

const SetValues = () => {
  const [credentialId] = useQueryState('credentialId');

  const form = useFormContext<IForm>();
  const queryClient = useQueryClient();

  useQuery({
    enabled: !!credentialId,
    queryKey: [REFERENCES_PRINCIPAL_CUSTOMER_CREDENTIALS_BASE_QUERY_KEY, 'get', credentialId],
    queryFn: async () => {
      const response = await referencesPrincipalCustomerCredentialsService.form.get(Number(credentialId)) as any;

      if (response) {
        form.setValue('serviceId', response.serviceId);
        form.setValue('username', response.username);
        form.setValue('password', response.password ?? '');
        form.setValue('additionalInformationUz', response.additionalInformationUz ?? '');
        form.setValue('additionalInformationRu', response.additionalInformationRu ?? '');
        form.setValue('principalCustomerId', response.principalCustomerId);
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [REFERENCES_PRINCIPAL_CUSTOMER_CREDENTIALS_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
