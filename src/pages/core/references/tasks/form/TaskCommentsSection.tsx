import type { FC } from 'react';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';

import {
  referencesTasksCommentsService,
  REFERENCES_TASKS_COMMENTS_BASE_QUERY_KEY,
} from '../../tasks-comments/services';

interface IProps {
  taskId: number;
}

const TaskCommentsSection: FC<IProps> = ({ taskId }) => {
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState('');

  const { data } = useQuery({
    queryKey: [REFERENCES_TASKS_COMMENTS_BASE_QUERY_KEY, 'by-task', taskId],
    queryFn: async () => {
      const response = await referencesTasksCommentsService.index({
        taskId,
        dataPerPage: 100,
        currentPage: 0,
      });
      return response;
    },
  });

  const { mutateAsync: createComment } = useMutation({
    mutationKey: [REFERENCES_TASKS_COMMENTS_BASE_QUERY_KEY, 'create'],
    mutationFn: async (text: string) => {
      const response = await referencesTasksCommentsService.form.create({
        text,
        taskId,
      });
      return response;
    },
    onSuccess: () => {
      toast.success('Comment added!');
      setNewComment('');
      queryClient.invalidateQueries({
        queryKey: [REFERENCES_TASKS_COMMENTS_BASE_QUERY_KEY],
      });
    },
  });

  const { mutateAsync: deleteComment } = useMutation({
    mutationKey: [REFERENCES_TASKS_COMMENTS_BASE_QUERY_KEY, 'delete'],
    mutationFn: async (id: number) => {
      const response = await referencesTasksCommentsService.form.delete(id);
      return response;
    },
    onSuccess: () => {
      toast.success('Comment deleted!');
      queryClient.invalidateQueries({
        queryKey: [REFERENCES_TASKS_COMMENTS_BASE_QUERY_KEY],
      });
    },
  });

  const handleSubmit = () => {
    if (newComment.trim()) {
      createComment(newComment.trim());
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Comments
      </Typography>

      <Stack spacing={1} sx={{ mb: 2, maxHeight: 200, overflowY: 'auto' }}>
        {data?.result?.map((comment) => (
          <Box
            key={comment.id}
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: 'background.neutral',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2">{comment.text}</Typography>
            <IconButton size="small" color="error" onClick={() => deleteComment(comment.id)}>
              <Iconify icon="solar:trash-bin-trash-bold" width={16} />
            </IconButton>
          </Box>
        ))}
      </Stack>

      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          size="small"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <Button variant="contained" color="black" size="small" onClick={handleSubmit}>
          Send
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskCommentsSection;
