import { useQuery } from '@tanstack/react-query'
import { usePopover } from 'minimal-shared/hooks'
import {
  parseAsString,
  parseAsArrayOf,
  useQueryStates, parseAsInteger
} from 'nuqs'

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

import { referencesRolesService } from 'src/pages/core/references/roles/services'

import { Iconify } from 'src/components/iconify'
import { CustomPopover } from 'src/components/custom-popover'

import { USERS_BASE_QUERY_KEY } from '../../services'

const Filters = () => {
  const menuActions = usePopover();

  const [{ roles, search }, setQueryStates] = useQueryStates(
    {
      roles: parseAsArrayOf(parseAsInteger).withDefault([]),
      search: parseAsString.withDefault(''),
    },
    {
      history: 'push',
    }
  );

  const { data: rolesList = [] } = useQuery({
    queryKey: [USERS_BASE_QUERY_KEY, 'rolesList'],
    queryFn: async () => {
      try {
        const response = await referencesRolesService.helpers.list();
        return response.map((role) => ({
          id: role.id,
          label: role.nameUz,
        }));
      } catch (error: unknown) {
        console.log('error while getting roles list', error);
        return [];
      }
    },
  });

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
            renderValue={(selected) =>
              selected.map((value) => rolesList.find((role) => role.id === value)?.label).join(', ')
            }
            inputProps={{ id: 'filter-role-select' }}
            MenuProps={{
              slotProps: { paper: { sx: { maxHeight: 240 } } },
            }}
          >
            {rolesList.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={roles.includes(option.id)}
                  slotProps={{ input: { id: `${option}-checkbox` } }}
                />
                {option.label}
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
