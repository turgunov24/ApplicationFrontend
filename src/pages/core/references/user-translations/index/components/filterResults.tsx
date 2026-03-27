import { useMemo, type FC } from 'react';
import { parseAsString, useQueryStates } from 'nuqs';

import Chip from '@mui/material/Chip';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

interface IProps {
  totalResults: number;
}

const FilterResults: FC<IProps> = ({ totalResults }) => {
  const [{ search }, setQueryStates] = useQueryStates(
    {
      search: parseAsString.withDefault(''),
    },
    {
      history: 'push',
    }
  );

  const handleReset = () => {
    setQueryStates({ search: '' });
  };

  const show = useMemo(() => !!search, [search]);

  return (
    <FiltersResult
      totalResults={totalResults}
      onReset={handleReset}
      sx={{ p: 2.5, pt: 0, display: show ? 'block' : 'none' }}
    >
      <FiltersBlock label="Keyword:" isShow={!!search}>
        <Chip {...chipProps} label={search} onDelete={() => setQueryStates({ search: '' })} />
      </FiltersBlock>
    </FiltersResult>
  );
};

export default FilterResults;
