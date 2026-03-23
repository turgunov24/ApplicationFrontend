import { useMemo, type FC } from 'react';
import { parseAsString, useQueryStates, parseAsStringEnum } from 'nuqs';

import Chip from '@mui/material/Chip';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

import { Statuses } from '../../services/types';

interface IProps {
  totalResults: number;
}

const FilterResults: FC<IProps> = ({ totalResults }) => {
  const [{ status, search }, setQueryStates] = useQueryStates(
    {
      status: parseAsStringEnum<Statuses>(Object.values(Statuses)).withDefault(Statuses.all),
      search: parseAsString.withDefault(''),
    },
    {
      history: 'push',
    }
  );

  const handleReset = () => {
    setQueryStates({ status: Statuses.all, search: '' });
  };

  const show = useMemo(() => status !== Statuses.all || !!search, [status, search]);

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

      <FiltersBlock label="Keyword:" isShow={!!search}>
        <Chip {...chipProps} label={search} onDelete={() => setQueryStates({ search: '' })} />
      </FiltersBlock>
    </FiltersResult>
  );
};

export default FilterResults;
