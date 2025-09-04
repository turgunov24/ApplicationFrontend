import type { IForm } from './form';

import { useEffect } from 'react';
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

      if (response) {
        form.setValue('fullName', response.fullName);
        form.setValue('username', response.username);
        form.setValue('email', response.email);
        form.setValue('phoneNumber', response.phone.padStart(13, '+'));
        form.setValue('stateId', { id: response.regionId, label: 'Andijan' });
        form.setValue('countryId', { id: response.countryId, label: 'Uzbekistan' });
        form.setValue('cityId', { id: response.cityId, label: 'Andijan' });
        form.setValue(
          'roles',
          response.roles.map((role) => ({ id: role, label: 'Andijan' }))
        );
        form.setValue('status', response.status);
        form.setValue('isVerified', true);
        // form.setValue('file', response.avatarPath);
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
