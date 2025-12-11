import type { Theme, SxProps } from '@mui/material/styles';
import type { IPermission } from '../permissions/types';

import { useMemo } from 'react';
import { m } from 'framer-motion';
import { isEqual } from 'es-toolkit';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { ForbiddenIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

import { useAuthStore } from '../store';

// ----------------------------------------------------------------------

/**
 * NOTE:
 * This component is for reference only.
 * You can customize the logic and conditions to better suit your application's requirements.
 */

export type RoleBasedGuardProp = {
  sx?: SxProps<Theme>;
  hasContent?: boolean;
  allowedPermissions?: Array<IPermission>;
  children: React.ReactNode;
};

export function RoleBasedGuard({
  sx,
  children,
  hasContent = true,
  allowedPermissions = [],
}: RoleBasedGuardProp) {
  const { permissions } = useAuthStore();

  const hasAccess = useMemo(() => {
    const found = permissions.find((permission) =>
      allowedPermissions.find((allowedPermission) =>
        isEqual(allowedPermission, {
          action: permission.action,
          resource: permission.resource,
        })
      )
    );
    return !!found;
  }, [permissions, allowedPermissions]);

  if (!hasAccess) {
    return hasContent ? (
      <Container
        component={MotionContainer}
        sx={[{ textAlign: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]}
      >
        <m.div variants={varBounce('in')}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Permission denied
          </Typography>
        </m.div>

        <m.div variants={varBounce('in')}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page.
          </Typography>
        </m.div>

        <m.div variants={varBounce('in')}>
          <ForbiddenIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
