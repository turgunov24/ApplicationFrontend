import type { QueryOptions } from '@tanstack/react-query';
import type { IListResponse as IReferencesTariffsListResponse } from 'src/pages/core/references/tariffs/services/types';
import type { IListResponse as IReferencesServicesListResponse } from 'src/pages/core/references/services/services/types';
import type { IListResponse as IReferencesCurrenciesListResponse } from 'src/pages/core/references/currencies/services/types';
import type { IListResponse as IReferencesLegalFormsListResponse } from 'src/pages/core/references/legal-forms/services/types';
import type { IListResponse as IPrincipalCustomersListResponse } from 'src/pages/core/admin/principal-customers/services/types';
import type { IListResponse as IReferencesClientTypesListResponse } from 'src/pages/core/references/client-types/services/types';
import type { IListResponse as IReferencesCounterpartiesListResponse } from 'src/pages/core/references/counterparties/services/types';
import type { IListResponse as IAttachTariffToPrincipalCustomersListResponse } from 'src/pages/core/references/attach-tariff-to-principal-customers/services/types';
import type { IListResponse as IReferencesPrincipalCustomerCredentialsListResponse } from 'src/pages/core/references/principal-customer-credentials/services/types';

import { useMemo, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { referencesTariffsService } from 'src/pages/core/references/tariffs/services';
import { referencesServicesService } from 'src/pages/core/references/services/services';
import { referencesCurrenciesService } from 'src/pages/core/references/currencies/services';
import { referencesLegalFormsService } from 'src/pages/core/references/legal-forms/services';
import { principalCustomersService } from 'src/pages/core/admin/principal-customers/services';
import { referencesClientTypesService } from 'src/pages/core/references/client-types/services';
import { referencesCounterpartiesService } from 'src/pages/core/references/counterparties/services';
import { attachTariffToPrincipalCustomersService } from 'src/pages/core/references/attach-tariff-to-principal-customers/services';
import { referencesPrincipalCustomerCredentialsService } from 'src/pages/core/references/principal-customer-credentials/services';

type ListTypeMap = {
  services: IReferencesServicesListResponse;
  counterparties: IReferencesCounterpartiesListResponse;
  principalCustomerCredentials: IReferencesPrincipalCustomerCredentialsListResponse;
  legalForms: IReferencesLegalFormsListResponse;
  clientTypes: IReferencesClientTypesListResponse;
  attachTariffToPrincipalCustomers: IAttachTariffToPrincipalCustomersListResponse;
  tariffs: IReferencesTariffsListResponse;
  currencies: IReferencesCurrenciesListResponse;
  principalCustomers: IPrincipalCustomersListResponse;
};

interface IUseListProps<T> extends QueryOptions {
  listType: T;
  invalidationOnUnmount?: boolean;
}

export const LISTS_BASE_QUERY_KEY = 'lists';

export default function useList<T extends keyof ListTypeMap>({
  listType,
  queryKey,
  invalidationOnUnmount = true,
}: IUseListProps<T>) {
  const queryClient = useQueryClient();

  const customQueryKey = useMemo(
    () => [LISTS_BASE_QUERY_KEY, listType, ...(queryKey || [])],
    [listType, queryKey]
  );

  const query = useQuery({
    queryKey: customQueryKey,
    queryFn: async () => {
      try {
        if (listType === 'services') {
          const response = await referencesServicesService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'counterparties') {
          const response = await referencesCounterpartiesService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'principalCustomerCredentials') {
          const response = await referencesPrincipalCustomerCredentialsService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'legalForms') {
          const response = await referencesLegalFormsService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'clientTypes') {
          const response = await referencesClientTypesService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'attachTariffToPrincipalCustomers') {
          const response = await attachTariffToPrincipalCustomersService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'tariffs') {
          const response = await referencesTariffsService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'currencies') {
          const response = await referencesCurrenciesService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'principalCustomers') {
          const response = await principalCustomersService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        return [];
      } catch (error: unknown) {
        console.log(`error while fetching ${listType}`, error);
        return [];
      }
    },
  });

  useEffect(
    () => () => {
      if (invalidationOnUnmount) {
        queryClient.invalidateQueries({ queryKey: customQueryKey });
      }
    },
    [invalidationOnUnmount, customQueryKey, queryClient]
  );

  return query;
}

