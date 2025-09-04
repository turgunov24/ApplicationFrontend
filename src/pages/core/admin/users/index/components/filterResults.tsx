import { useMemo, type FC } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  parseAsString,
  parseAsArrayOf,
  useQueryStates,
  parseAsInteger,
  parseAsStringEnum,
} from 'nuqs'

import Chip from '@mui/material/Chip'

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result'

import { Statuses } from '../../services/types'
import { USERS_BASE_QUERY_KEY } from '../../services'

interface IProps {
  totalResults: number;
}

const FilterResults: FC<IProps> = ({ totalResults }) => {
  const queryClient = useQueryClient();

  const rolesList = queryClient.getQueryData([USERS_BASE_QUERY_KEY, 'rolesList']) as Array<{
    id: number;
    label: string;
  }>;

  const [{ status, roles, search }, setQueryStates] = useQueryStates(
    {
      roles: parseAsArrayOf(parseAsInteger).withDefault([]),
      status: parseAsStringEnum<Statuses>(Object.values(Statuses)).withDefault(Statuses.all),
      search: parseAsString.withDefault(''),
    },
    {
      history: 'push',
    }
  );

  const handleReset = () => {
    setQueryStates({ status: Statuses.all, roles: [], search: '' });
  };

  const show = useMemo(
    () => status !== Statuses.all || roles.length > 0 || !!search,
    [status, roles, search]
  );

  return (
    <FiltersResult
      totalResults={totalResults}
      onReset={handleReset}
      sx={{ p: 2.5, pt: 0, display: show ? 'block' : 'none' }}
    >
      <FiltersBlock label="Status:" isShow={status !== 'all'}>
        <Chip
          {...chipProps}
          label={status}
          onDelete={() => setQueryStates({ status: Statuses.all })}
          sx={{ textTransform: 'capitalize' }}
        />
      </FiltersBlock>

      <FiltersBlock label="Role:" isShow={!!roles.length}>
        {roles.map((item) => (
          <Chip
            {...chipProps}
            key={item}
            label={rolesList.find((role) => role.id === item)?.label}
            onDelete={() => setQueryStates({ roles: roles.filter((role) => role !== item) })}
          />
        ))}
      </FiltersBlock>

      <FiltersBlock label="Keyword:" isShow={!!search}>
        <Chip {...chipProps} label={search} onDelete={() => setQueryStates({ search: '' })} />
      </FiltersBlock>
    </FiltersResult>
  );
};

export default FilterResults;
