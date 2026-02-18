import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { CONFIG } from 'src/global-config';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

import { usePathname } from '../hooks';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard'));

const PrincipalCustomersPage = lazy(() => import('src/pages/core/admin/principal-customers/index'));
const PrincipalCustomersFormPage = lazy(
  () => import('src/pages/core/admin/principal-customers/form')
);

const ReferencesClientTypesPage = lazy(
  () => import('src/pages/core/references/client-types/index')
);

// ----------------------------------------------------------------------

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense key={pathname} fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}

const dashboardLayout = () => (
  <DashboardLayout>
    <SuspenseOutlet />
  </DashboardLayout>
);

export const dashboardRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? dashboardLayout() : <AuthGuard>{dashboardLayout()}</AuthGuard>,
    children: [
      { index: true, element: <IndexPage /> },
      {
        path: 'principal-customers',
        children: [
          {
            index: true,
            element: <PrincipalCustomersPage />,
          },
          {
            path: 'create',
            element: <PrincipalCustomersFormPage />,
          },
          {
            path: 'edit/:id',
            element: <PrincipalCustomersFormPage />,
          },
        ],
      },
      {
        path: 'references',
        children: [
          {
            path: 'client-types',
            element: <ReferencesClientTypesPage />,
          },
        ],
      },
    ],
  },
];
