import type { IForm } from './form';

import { useEffect } from 'react';
import { HttpStatusCode } from 'axios';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useParams } from 'src/routes/hooks';

import { usersService, USERS_BASE_QUERY_KEY } from '../services';

const SetValues = () => {
  const { id } = useParams();
  const form = useFormContext<IForm>();
  const queryClient = useQueryClient();

  useQuery({
    enabled: !!id,
    queryKey: [USERS_BASE_QUERY_KEY, 'get', id],
    queryFn: async () => {
      const response = await usersService.form.get(Number(id));

      if (response.status === HttpStatusCode.Ok) {
        form.setValue('fullName', response.data.fullName);
        form.setValue('username', response.data.username);
        form.setValue('email', response.data.email);
        form.setValue('phone', response.data.phone.padStart(13, '+'));
        form.setValue('regionId', response.data.regionId);
        form.setValue('countryId', response.data.countryId);
        form.setValue('districtId', response.data.districtId);
        form.setValue('roles', response.data.roles);
        if (response.data.avatarPath) {
          const url = new URL(response.data.avatarPath, import.meta.env.VITE_SERVER_URL);
          const avatarResponse = await usersService.helpers.getAvatar(url.toString());
          if (avatarResponse.status === HttpStatusCode.Ok) {
            const blob = avatarResponse.data;
            // Extract filename from avatarPath or use default
            const filename = response.data.avatarPath.split('/').pop() || 'avatar.jpg';
            // Convert Blob to File object
            const file = new File([blob], filename, { type: blob.type || 'image/jpeg' });
            form.setValue('file', file);
          }
        }
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [USERS_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
