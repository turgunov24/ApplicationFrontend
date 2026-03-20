import type { IForm } from './form';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  referencesLegalFormsService,
  REFERENCES_LEGAL_FORMS_BASE_QUERY_KEY,
} from '../services';

const SetValues = () => {
  const [legalFormId] = useQueryState('legalFormId');

  const form = useFormContext<IForm>();
  const queryClient = useQueryClient();

  useQuery({
    enabled: !!legalFormId,
    queryKey: [REFERENCES_LEGAL_FORMS_BASE_QUERY_KEY, 'get', legalFormId],
    queryFn: async () => {
      const response = await referencesLegalFormsService.form.get(Number(legalFormId));

      if (response) {
        form.setValue('name', response.name);
      }
      return response;
    },
  });

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [REFERENCES_LEGAL_FORMS_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
