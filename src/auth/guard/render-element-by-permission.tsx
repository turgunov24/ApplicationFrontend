import type { FC, PropsWithChildren } from 'react';
import type { IPermission } from '../permissions/types';

import { useMemo } from 'react';
import { isEqual } from 'es-toolkit/compat';

import { useAuthStore } from '../store';

interface IProps {
  permissions: Array<IPermission>;
}

export const RenderElementByPermission: FC<PropsWithChildren<IProps>> = ({
  permissions,
  children,
}) => {
  const { permissions: userPermissions } = useAuthStore();

  const show = useMemo(
    () =>
      !!userPermissions.find((up) =>
        permissions.find((p) => isEqual(p, { resource: up.resource, action: up.action }))
      ),
    [permissions, userPermissions]
  );

  return <>{show ? children : null}</>;
};
