import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import {
  ATTACH_TARIFF_TO_PRINCIPAL_CUSTOMERS_BASE_QUERY_KEY,
} from '../services';

const SetValues = () => {
  const queryClient = useQueryClient();

  useEffect(
    () => () => {
      queryClient.invalidateQueries({ queryKey: [ATTACH_TARIFF_TO_PRINCIPAL_CUSTOMERS_BASE_QUERY_KEY] });
    },
    [queryClient]
  );

  return null;
};

export default SetValues;
