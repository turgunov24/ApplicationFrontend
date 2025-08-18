import { useMemo, type FC } from 'react';
import { parseAsString, parseAsArrayOf, useQueryStates, parseAsStringEnum } from 'nuqs';

import Chip from '@mui/material/Chip';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

import { Roles, Statuses } from '../../services/types';

interface IProps {
  totalResults: number;
}

const FilterResults: FC<IProps> = ({ totalResults }) => {
  const [{ status, roles, search }, setQueryStates] = useQueryStates(
    {
      roles: parseAsArrayOf(parseAsStringEnum<Roles>(Object.values(Roles))).withDefault([]),
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
            label={item}
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
