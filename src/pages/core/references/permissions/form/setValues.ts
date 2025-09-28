import type { IForm } from './form';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { referencesPermissionsService, REFERENCES_PERMISSIONS_BASE_QUERY_KEY } from '../services';

const SetValues = () => {
  const [permissionId] = useQueryState('permissionId');
  const queryClient = useQueryClient();

  const form = useFormContext<IForm>();

  useQuery({
    enabled: !!permissionId,
    queryKey: [REFERENCES_PERMISSIONS_BASE_QUERY_KEY, 'get', permissionId],
    queryFn: async () => {
      const response = await referencesPermissionsService.form.get(Number(permissionId));

      if (response) {
        form.setValue('nameUz', response.nameUz);
        form.setValue('nameRu', response.nameRu);
        form.setValue('permissionGroupId', response.permissionGroupId);
        form.setValue('resource', response.resource);
        form.setValue('action', response.action);
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [REFERENCES_PERMISSIONS_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
