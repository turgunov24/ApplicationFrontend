
import { usePopover } from 'minimal-shared/hooks'
import { parseAsString, parseAsArrayOf, useQueryStates, parseAsStringEnum } from 'nuqs'

import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import MenuList from '@mui/material/MenuList'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'

import { Iconify } from 'src/components/iconify'
import { CustomPopover } from 'src/components/custom-popover'

import { Roles } from '../../services/types'

const Filters = () => {
  const menuActions = usePopover();

  const [{ roles, search }, setQueryStates] = useQueryStates(
    {
      roles: parseAsArrayOf(parseAsStringEnum<Roles>(Object.values(Roles))).withDefault([]),
      search: parseAsString.withDefault(''),
    },
    {
      history: 'push',
    }
  );

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <Box
        sx={{
          p: 2.5,
          gap: 2,
          display: 'flex',
          pr: { xs: 2.5, md: 1 },
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-end', md: 'center' },
        }}
      >
        <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
          <InputLabel htmlFor="filter-role-select">Role</InputLabel>
          <Select
            multiple
            label="Role"
            value={roles}
            onChange={(event) => {
              // @ts-expect-error string buladi devotiyu bu
              setQueryStates({ roles: event.target.value });
            }}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            inputProps={{ id: 'filter-role-select' }}
            MenuProps={{
              slotProps: { paper: { sx: { maxHeight: 240 } } },
            }}
          >
            {Object.values(Roles).map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={roles.includes(option)}
                  slotProps={{ input: { id: `${option}-checkbox` } }}
                />
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box
          sx={{
            gap: 2,
            width: 1,
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TextField
            fullWidth
            value={search}
            onChange={(e) => setQueryStates({ search: e.target.value })}
            placeholder="Search..."
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <IconButton onClick={menuActions.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Box>
      </Box>

      {renderMenuActions()}
    </>
  );
};

export default Filters;
