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
const ReferencesServicesPage = lazy(
  () => import('src/pages/core/references/services/index')
);
const ReferencesCounterpartiesPage = lazy(
  () => import('src/pages/core/references/counterparties/index')
);
const ReferencesPrincipalCustomerCredentialsPage = lazy(
  () => import('src/pages/core/references/principal-customer-credentials/index')
);
const ReferencesLegalFormsPage = lazy(
  () => import('src/pages/core/references/legal-forms/index')
);
const ReferencesClientTypesPage = lazy(
  () => import('src/pages/core/references/client-types/index')
);
const ReferencesAttachTariffToPrincipalCustomersPage = lazy(
  () => import('src/pages/core/references/attach-tariff-to-principal-customers/index')
);
const ReferencesTariffsPage = lazy(
  () => import('src/pages/core/references/tariffs/index')
);
const ReferencesCurrenciesPage = lazy(
  () => import('src/pages/core/references/currencies/index')
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
        path: 'references',
        children: [
          {
            path: 'services',
            element: <ReferencesServicesPage />,
          },
          {
            path: 'counterparties',
            element: <ReferencesCounterpartiesPage />,
          },
          {
            path: 'principal-customer-credentials',
            element: <ReferencesPrincipalCustomerCredentialsPage />,
          },
          {
            path: 'legal-forms',
            element: <ReferencesLegalFormsPage />,
          },
          {
            path: 'client-types',
            element: <ReferencesClientTypesPage />,
          },
          {
            path: 'attach-tariff-to-principal-customers',
            element: <ReferencesAttachTariffToPrincipalCustomersPage />,
          },
          {
            path: 'tariffs',
            element: <ReferencesTariffsPage />,
          },
          {
            path: 'currencies',
            element: <ReferencesCurrenciesPage />,
          },
        ],
      },
    ],
  },
];
