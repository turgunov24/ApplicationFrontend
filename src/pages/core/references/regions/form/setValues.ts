import type { IForm } from './form';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { referencesRegionsService, REFERENCES_REGIONS_BASE_QUERY_KEY } from '../services';

const SetValues = () => {
  const [regionId] = useQueryState('regionId');
  const queryClient = useQueryClient();

  const form = useFormContext<IForm>();

  useQuery({
    enabled: !!regionId,
    queryKey: [REFERENCES_REGIONS_BASE_QUERY_KEY, 'get', regionId],
    queryFn: async () => {
      const response = await referencesRegionsService.form.get(Number(regionId));

      if (response) {
        form.setValue('nameUz', response.nameUz);
        form.setValue('nameRu', response.nameRu);

        if (response.countryId) {
          const countries = queryClient.getQueryData<
            Array<{ id: number; nameUz: string; nameRu: string }>
          >([REFERENCES_REGIONS_BASE_QUERY_KEY, 'countries-list']);

          if (Array.isArray(countries)) {
            const found = countries.find((country) => country.id === response.countryId);

            if (found) {
              form.setValue('countryId', {
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
      queryClient.invalidateQueries({ queryKey: [REFERENCES_REGIONS_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
