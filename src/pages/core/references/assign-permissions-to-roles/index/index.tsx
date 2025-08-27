import { useQueryClient } from '@tanstack/react-query'

import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

import { paths } from 'src/routes/paths'

import { CONFIG } from 'src/global-config'
import { DashboardContent } from 'src/layouts/dashboard'

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs'

// ----------------------------------------------------------------------

const metadata = { title: `Roles - ${CONFIG.appName}` };

export default function Page() {
  const theme = useTheme();
  const queryClient = useQueryClient();

  return (
    <>
      <title>{metadata.title}</title>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Assign Permissions to Roles' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Card>
          <TableContainer>
            <Table
              sx={{
                [`.${tableCellClasses.root}`]: {
                  '&:nth-of-type(1)': {
                    minWidth: theme.spacing(40),
                    backgroundColor: 'background.default',
                    border: 'none',
                    boxShadow: theme.vars.customShadows.card,
                  },
                },
                [`.${tableCellClasses.head}`]: {
                  '&:nth-of-type(1)': {
                    position: 'sticky',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 1,
                  },
                },
                [`.${tableCellClasses.body}`]: {
                  '&:nth-of-type(1)': {
                    position: 'sticky',
                    left: 0,
                    zIndex: 3,
                  },
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" color="textPrimary">
                      Permissions
                    </Typography>
                  </TableCell>
                  {Array.from({ length: 25 }).map((_, index) => (
                    <TableCell key={index}>Assign</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Automatic Entity Labels</TableCell>
                  <TableCell colSpan={24} />
                </TableRow>
                {Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>Lorem ipsum dolor sit amet consectetur adipisici</TableCell>
                    {Array.from({ length: 25 }).map((a, i) => (
                      <TableCell key={i}>
                        <Checkbox />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </DashboardContent>
    </>
  );
}
