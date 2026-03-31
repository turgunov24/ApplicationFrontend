import type { FC } from 'react';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';

import { REFERENCES_TASKS_BASE_QUERY_KEY } from '../services';
import {
  referencesTaskActionsHistoryService,
  REFERENCES_TASK_ACTIONS_HISTORY_BASE_QUERY_KEY,
} from '../../task-actions-history/services';

const TASK_STATUSES = [
  'pending',
  'active',
  'finished',
  'send',
  'cancelled',
  'archived',
] as const;

interface IProps {
  taskId: number;
}

const TaskActionsHistorySection: FC<IProps> = ({ taskId }) => {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<typeof TASK_STATUSES[number] | ''>('');

  const { data } = useQuery({
    queryKey: [REFERENCES_TASK_ACTIONS_HISTORY_BASE_QUERY_KEY, 'by-task', taskId],
    queryFn: async () => {
      const response = await referencesTaskActionsHistoryService.index({
        taskId,
        dataPerPage: 100,
        currentPage: 0,
      });
      return response;
    },
  });

  const { mutateAsync: changeStatus } = useMutation({
    mutationKey: [REFERENCES_TASK_ACTIONS_HISTORY_BASE_QUERY_KEY, 'change-status'],
    mutationFn: async (status: typeof TASK_STATUSES[number]) => {
      const response = await referencesTaskActionsHistoryService.changeStatus({
        taskId,
        type: 'changeStatus',
        status,
      });
      return response;
    },
    onSuccess: () => {
      toast.success('Status changed!');
      setSelectedStatus('');
      queryClient.invalidateQueries({
        queryKey: [REFERENCES_TASK_ACTIONS_HISTORY_BASE_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [REFERENCES_TASKS_BASE_QUERY_KEY],
      });
    },
  });

  const handleChangeStatus = () => {
    if (selectedStatus) {
      changeStatus(selectedStatus);
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'active') return 'success';
    if (status === 'finished') return 'info';
    if (status === 'cancelled' || status === 'deleted') return 'error';
    if (status === 'archived') return 'warning';
    return 'default';
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Actions History
      </Typography>

      <Stack spacing={1} sx={{ mb: 2, maxHeight: 200, overflowY: 'auto' }}>
        {data?.result?.map((history) => (
          <Box
            key={history.id}
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: 'background.neutral',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Label variant="soft" color={getStatusColor(history.status)}>
                {history.status}
              </Label>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {new Date(history.createdAt).toLocaleString()}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>

      <Stack direction="row" spacing={1}>
        <TextField
          select
          fullWidth
          size="small"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as typeof TASK_STATUSES[number])}
          label="Change Status"
        >
          {TASK_STATUSES.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="black"
          size="small"
          onClick={handleChangeStatus}
          disabled={!selectedStatus}
        >
          Apply
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskActionsHistorySection;
