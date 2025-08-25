import type { IForm } from './form';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { referencesPermissionGroupsService, REFERENCES_PERMISSION_GROUPS_BASE_QUERY_KEY } from '../services';

const SetValues = () => {
  const [permissionGroupId] = useQueryState('permissionGroupId');

  const form = useFormContext<IForm>();
  const queryClient = useQueryClient();

  useQuery({
    enabled: !!permissionGroupId,
    queryKey: [REFERENCES_PERMISSION_GROUPS_BASE_QUERY_KEY, 'get', permissionGroupId],
    queryFn: async () => {
      const response = await referencesPermissionGroupsService.form.get(Number(permissionGroupId));

      if (response) {
        form.setValue('nameUz', response.nameUz);
        form.setValue('nameRu', response.nameRu);
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [REFERENCES_PERMISSION_GROUPS_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
