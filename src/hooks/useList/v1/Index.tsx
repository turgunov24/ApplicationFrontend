import type { QueryOptions } from '@tanstack/react-query';
import type { IListResponse as IUsersListResponse } from 'src/pages/core/admin/users/services/types';
import type { IListResponse as IPrincipalsListResponse } from 'src/pages/core/admin/principals/services/types';
import type { IListResponse as IReferencesRegionsListResponse } from 'src/pages/core/references/regions/services/types';
import type { IListResponse as IReferencesServicesListResponse } from 'src/pages/core/references/services/services/types';
import type { IListResponse as IReferencesCountriesListResponse } from 'src/pages/core/references/countries/services/types';
import type { IListResponse as IReferencesDistrictsListResponse } from 'src/pages/core/references/districts/services/types';
import type { IListResponse as IReferencesLegalFormsListResponse } from 'src/pages/core/references/legal-forms/services/types';
import type { IListResponse as IPrincipalCustomersListResponse } from 'src/pages/core/admin/principal-customers/services/types';
import type { IListResponse as IReferencesClientTypesListResponse } from 'src/pages/core/references/client-types/services/types';
import type { IListResponse as IReferencesTaskTemplatesListResponse } from 'src/pages/core/references/task-templates/services/types';
import type { IListResponse as IReferencesCounterpartiesListResponse } from 'src/pages/core/references/counterparties/services/types';
import type { IListResponse as IReferencesPermissionGroupsListResponse } from 'src/pages/core/references/permission-groups/services/types';
import type {
  IResourcesListResponse,
  IListResponse as IReferencesRolesListResponse,
} from 'src/pages/core/references/roles/services/types';

import { useMemo, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import axiosInstance from 'src/lib/axios';
import { usersService } from 'src/pages/core/admin/users/services';
import { principalsService } from 'src/pages/core/admin/principals/services';
import { referencesRolesService } from 'src/pages/core/references/roles/services';
import { referencesRegionsService } from 'src/pages/core/references/regions/services';
import { referencesServicesService } from 'src/pages/core/references/services/services';
import { referencesCountriesService } from 'src/pages/core/references/countries/services';
import { referencesDistrictsService } from 'src/pages/core/references/districts/services';
import { referencesLegalFormsService } from 'src/pages/core/references/legal-forms/services';
import { principalCustomersService } from 'src/pages/core/admin/principal-customers/services';
import { referencesClientTypesService } from 'src/pages/core/references/client-types/services';
import { referencesTaskTemplatesService } from 'src/pages/core/references/task-templates/services';
import { referencesCounterpartiesService } from 'src/pages/core/references/counterparties/services';
import { referencesPermissionGroupsService } from 'src/pages/core/references/permission-groups/services';

type ListTypeMap = {
  countries: IReferencesCountriesListResponse;
  regions: IReferencesRegionsListResponse;
  districts: IReferencesDistrictsListResponse;
  roles: IReferencesRolesListResponse;
  resources: IResourcesListResponse;
  permissionGroups: IReferencesPermissionGroupsListResponse;
  principals: IPrincipalsListResponse;
  clientTypes: IReferencesClientTypesListResponse;
  counterparties: IReferencesCounterpartiesListResponse;
  legalForms: IReferencesLegalFormsListResponse;
  services: IReferencesServicesListResponse;
  principalCustomers: IPrincipalCustomersListResponse;
  users: IUsersListResponse;
  taskTemplates: IReferencesTaskTemplatesListResponse;
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
        if (listType === 'countries') {
          const response = await referencesCountriesService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'regions') {
          const response = await referencesRegionsService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'districts') {
          const response = await referencesDistrictsService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'roles') {
          const response = await referencesRolesService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'resources') {
          const response = await axiosInstance.get<IResourcesListResponse>(
            '/api/core/references/resources'
          );
          return response.data as unknown as ListTypeMap[T];
        }
        if (listType === 'permissionGroups') {
          const response = await referencesPermissionGroupsService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'principals') {
          const response = await principalsService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'clientTypes') {
          const response = await referencesClientTypesService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'counterparties') {
          const response = await referencesCounterpartiesService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'legalForms') {
          const response = await referencesLegalFormsService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'services') {
          const response = await referencesServicesService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'principalCustomers') {
          const response = await principalCustomersService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'users') {
          const response = await usersService.helpers.list();
          return response as unknown as ListTypeMap[T];
        }
        if (listType === 'taskTemplates') {
          const response = await referencesTaskTemplatesService.helpers.list();
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
