import type { Editor } from '@tiptap/react';
import type { EditorToolbarItemProps } from '../types';

import { useState, useCallback } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { editorClasses } from '../classes';
import { ToolbarItem } from './toolbar-item';

// ----------------------------------------------------------------------

type LinkBlockProps = {
  editor: Editor;
  active: boolean;
  linkIcon: EditorToolbarItemProps['icon'];
  unlinkIcon: EditorToolbarItemProps['icon'];
};

export function LinkBlock({ editor, linkIcon, unlinkIcon, active }: LinkBlockProps) {
  const [linkUrl, setLinkUrl] = useState('');
  const { anchorEl, open, onOpen, onClose } = usePopover();

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const currentUrl = editor.getAttributes('link').href ?? '';

      onOpen(event);
      setLinkUrl(currentUrl);
    },
    [editor, onOpen]
  );

  const handleApply = useCallback(() => {
    const chainCommands = () => editor.chain().focus().extendMarkRange('link');

    onClose();

    if (linkUrl) {
      chainCommands().setLink({ href: linkUrl }).run();
    } else {
      chainCommands().unsetLink().run();
    }
  }, [editor, linkUrl, onClose]);

  const popoverId = open ? 'link-popover' : undefined;

  return (
    <>
      <ToolbarItem
        aria-describedby={popoverId}
        aria-label="Insert link"
        active={active}
        className={editorClasses.toolbar.link}
        onClick={handleOpenPopover}
        icon={linkIcon}
      />

      <ToolbarItem
        aria-label="Remove link"
        disabled={!active}
        className={editorClasses.toolbar.unlink}
        onClick={() => editor.chain().focus().unsetLink().run()}
        icon={unlinkIcon}
      />

      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              p: 2.5,
              gap: 1.25,
              width: 1,
              maxWidth: 320,
              display: 'flex',
              flexDirection: 'column',
            },
          },
        }}
      >
        <Typography variant="subtitle2">Link URL</Typography>

        <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter URL"
            value={linkUrl}
            onChange={(event) => setLinkUrl(event.target.value)}
          />
          <Button variant="contained" disabled={!linkUrl} onClick={handleApply}>
            Apply
          </Button>
        </Box>
      </Popover>
    </>
  );
}
