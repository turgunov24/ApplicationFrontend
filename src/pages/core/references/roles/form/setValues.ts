import type { IForm } from './form'

import { useEffect } from 'react'
import { useQueryState } from 'nuqs'
import { useFormContext } from 'react-hook-form'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { referencesRolesService, REFERENCES_ROLES_BASE_QUERY_KEY } from '../services'

const SetValues = () => {
  const [roleId] = useQueryState('roleId');

  const form = useFormContext<IForm>();
  const queryClient = useQueryClient();

  useQuery({
    enabled: !!roleId,
    queryKey: [REFERENCES_ROLES_BASE_QUERY_KEY, 'get', roleId],
    queryFn: async () => {
      const response = await referencesRolesService.form.get(Number(roleId));

      if (response) {
        form.setValue('nameUz', response.nameUz);
        form.setValue('nameRu', response.nameRu);
        form.setValue('descriptionUz', response.descriptionUz);
        form.setValue('descriptionRu', response.descriptionRu);
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [REFERENCES_ROLES_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
