import type { QueryOptions } from '@tanstack/react-query'
import type { IListResponse as IReferencesRolesListResponse } from 'src/pages/core/references/roles/services/types'
import type { IListResponse as IReferencesRegionsListResponse } from 'src/pages/core/references/regions/services/types'
import type { IListResponse as IReferencesCountriesListResponse } from 'src/pages/core/references/countries/services/types'
import type { IListResponse as IReferencesDistrictsListResponse } from 'src/pages/core/references/districts/services/types'

import { useMemo, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { referencesRolesService } from 'src/pages/core/references/roles/services'
import { referencesRegionsService } from 'src/pages/core/references/regions/services'
import { referencesCountriesService } from 'src/pages/core/references/countries/services'
import { referencesDistrictsService } from 'src/pages/core/references/districts/services'

type ListTypeMap = {
  countries: IReferencesCountriesListResponse;
  regions: IReferencesRegionsListResponse;
  districts: IReferencesDistrictsListResponse;
  roles: IReferencesRolesListResponse;
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
