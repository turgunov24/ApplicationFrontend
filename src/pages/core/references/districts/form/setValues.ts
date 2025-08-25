import type { IForm } from './form'

import { useEffect } from 'react'
import { useQueryState } from 'nuqs'
import { useFormContext } from 'react-hook-form'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { referencesDistrictsService, REFERENCES_DISTRICTS_BASE_QUERY_KEY } from '../services'

const SetValues = () => {
  const [districtId] = useQueryState('districtId');
  const queryClient = useQueryClient();

  const form = useFormContext<IForm>();

  useQuery({
    enabled: !!districtId,
    queryKey: [REFERENCES_DISTRICTS_BASE_QUERY_KEY, 'get', districtId],
    queryFn: async () => {
      const response = await referencesDistrictsService.form.get(Number(districtId));

      if (response) {
        form.setValue('nameUz', response.nameUz);
        form.setValue('nameRu', response.nameRu);

        if (response.regionId) {
          const regions = queryClient.getQueryData<
            Array<{ id: number; nameUz: string; nameRu: string }>
          >([REFERENCES_DISTRICTS_BASE_QUERY_KEY, 'regions-list']);

          if (Array.isArray(regions)) {
            const found = regions.find((region) => region.id === response.regionId);

            if (found) {
              form.setValue('regionId', {
                id: found.id,
                label: found.nameUz,
              });
            }
          }
        }
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [REFERENCES_DISTRICTS_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
