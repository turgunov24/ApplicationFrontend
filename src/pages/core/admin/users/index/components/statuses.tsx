import type { FC } from 'react'
import type { IGetCountsByStatusResponse } from '../../services/types';

import { varAlpha } from 'minimal-shared/utils'
import { useQueryStates, parseAsStringEnum } from 'nuqs'

import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import { Label } from 'src/components/label'

import { Statuses as StatusesEnum } from '../../services/types'

interface IProps {
  countsByStatus: IGetCountsByStatusResponse;
}

const Statuses: FC<IProps> = ({ countsByStatus }) => {
  const [{ status }, setQueryStates] = useQueryStates(
    {
      status: parseAsStringEnum<StatusesEnum>(Object.values(Statuses)).withDefault(
        StatusesEnum.all
      ),
    },
    {
      history: 'push',
    }
  );

  return (
    <Tabs
      value={status}
      onChange={(_, value) => setQueryStates({ status: value })}
      sx={[
        (theme) => ({
          px: { md: 2.5 },
          boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
        }),
      ]}
    >
      {Object.values(StatusesEnum).map((s) => (
        <Tab
          key={s}
          iconPosition="end"
          value={s}
          label={s}
          icon={
            <Label
              variant={s === status ? 'filled' : 'soft'}
              color={
                (s === 'active' && 'success') ||
                (s === 'pending' && 'warning') ||
                (s === 'banned' && 'error') ||
                'default'
              }
            >
              {countsByStatus[s]}
            </Label>
          }
        />
      ))}
    </Tabs>
  );
};

export default Statuses;
