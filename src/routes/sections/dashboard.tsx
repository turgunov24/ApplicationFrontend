import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { CONFIG } from 'src/global-config';
import { DashboardLayout } from 'src/layouts/dashboard';
import { usersPermissions } from 'src/pages/core/admin/users/helpers/permissions';
import { principalsPermissions } from 'src/pages/core/admin/principals/helpers/permissions';
import { referencesRolesPermissions } from 'src/pages/core/references/roles/helpers/permissions';
import { referencesTasksPermissions } from 'src/pages/core/references/tasks/helpers/permissions';
import { referencesRegionsPermissions } from 'src/pages/core/references/regions/helpers/permissions';
import { referencesTariffsPermissions } from 'src/pages/core/references/tariffs/helpers/permissions';
import { referencesServicesPermissions } from 'src/pages/core/references/services/helpers/permissions';
import { referencesCountriesPermissions } from 'src/pages/core/references/countries/helpers/permissions';
import { referencesDistrictsPermissions } from 'src/pages/core/references/districts/helpers/permissions';
import { referencesCurrenciesPermissions } from 'src/pages/core/references/currencies/helpers/permissions';
import { referencesLegalFormsPermissions } from 'src/pages/core/references/legal-forms/helpers/permissions';
import { referencesPermissionsPermissions } from 'src/pages/core/references/permissions/helpers/permissions';
import { principalCustomersPermissions } from 'src/pages/core/admin/principal-customers/helpers/permissions';
import { referencesClientTypesPermissions } from 'src/pages/core/references/client-types/helpers/permissions';
import { referencesTranslationsPermissions } from 'src/pages/core/references/translations/helpers/permissions';
import { referencesTaskTemplatesPermissions } from 'src/pages/core/references/task-templates/helpers/permissions';
import { referencesCounterpartiesPermissions } from 'src/pages/core/references/counterparties/helpers/permissions';
import { referencesTaskRecurrencePermissions } from 'src/pages/core/references/task-recurrence/helpers/permissions';
import { referencesPermissionGroupsPermissions } from 'src/pages/core/references/permission-groups/helpers/permissions';
import { referencesUserTranslationsPermissions } from 'src/pages/core/references/user-translations/helpers/permissions';
import { attachTemplateToTaskPermissions } from 'src/pages/core/references/attach-template-to-task/helpers/permissions';
import { assignPermissionsToRolesPermissions } from 'src/pages/core/references/assign-permissions-to-roles/helpers/permissions';
import { referencesTaskTemplateCategoriesPermissions } from 'src/pages/core/references/task-template-categories/helpers/permissions';
import { referencesPrincipalCustomerCredentialsPermissions } from 'src/pages/core/references/principal-customer-credentials/helpers/permissions';
import { attachTariffToPrincipalCustomersPermissions } from 'src/pages/core/references/attach-tariff-to-principal-customers/helpers/permissions';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard, RoleBasedGuard } from 'src/auth/guard';

import { paths } from '../paths';
import { usePathname } from '../hooks';

// ----------------------------------------------------------------------

// Dashboard
const IndexPage = lazy(() => import('src/pages/dashboard'));

const UsersPage = lazy(() => import('src/pages/core/admin/users/index'));
const UsersFormPage = lazy(() => import('src/pages/core/admin/users/form'));

const PrincipalsPage = lazy(() => import('src/pages/core/admin/principals/index'));
const PrincipalsFormPage = lazy(() => import('src/pages/core/admin/principals/form'));

const PrincipalCustomersPage = lazy(() => import('src/pages/core/admin/principal-customers/index'));
const PrincipalCustomersFormPage = lazy(
  () => import('src/pages/core/admin/principal-customers/form')
);

const ReferencesCountriesPage = lazy(() => import('src/pages/core/references/countries/index'));
const ReferencesRegionsPage = lazy(() => import('src/pages/core/references/regions/index'));
const ReferencesDistrictsPage = lazy(() => import('src/pages/core/references/districts/index'));
const ReferencesPermissionGroupsPage = lazy(
  () => import('src/pages/core/references/permission-groups/index')
);
const ReferencesPermissionsPage = lazy(() => import('src/pages/core/references/permissions/index'));
const ReferencesRolesPage = lazy(() => import('src/pages/core/references/roles/index'));
const ReferencesAssignPermissionsToRolesPage = lazy(
  () => import('src/pages/core/references/assign-permissions-to-roles/index')
);
const ReferencesCurrenciesPage = lazy(() => import('src/pages/core/references/currencies/index'));
const ReferencesClientTypesPage = lazy(
  () => import('src/pages/core/references/client-types/index')
);
const ReferencesTariffsPage = lazy(() => import('src/pages/core/references/tariffs/index'));
const ReferencesCounterpartiesPage = lazy(
  () => import('src/pages/core/references/counterparties/index')
);
const ReferencesLegalFormsPage = lazy(() => import('src/pages/core/references/legal-forms/index'));
const ReferencesServicesPage = lazy(() => import('src/pages/core/references/services/index'));
const ReferencesPrincipalCustomerCredentialsPage = lazy(
  () => import('src/pages/core/references/principal-customer-credentials/index')
);
const ReferencesAttachTariffToPrincipalCustomersPage = lazy(
  () => import('src/pages/core/references/attach-tariff-to-principal-customers/index')
);
const ReferencesAttachTemplateToTaskPage = lazy(
  () => import('src/pages/core/references/attach-template-to-task/index')
);
const ReferencesTranslationsPage = lazy(
  () => import('src/pages/core/references/translations/index')
);
const ReferencesUserTranslationsPage = lazy(
  () => import('src/pages/core/references/user-translations/index')
);
const ReferencesTasksPage = lazy(() => import('src/pages/core/references/tasks/index'));
const ReferencesTaskTemplatesPage = lazy(
  () => import('src/pages/core/references/task-templates/index')
);
const ReferencesTaskTemplateCategoriesPage = lazy(
  () => import('src/pages/core/references/task-template-categories/index')
);
const ReferencesTaskRecurrencePage = lazy(
  () => import('src/pages/core/references/task-recurrence/index')
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
    path: paths.dashboard.root,
    element: CONFIG.auth.skip ? dashboardLayout() : <AuthGuard>{dashboardLayout()}</AuthGuard>,
    children: [
      { index: true, element: <IndexPage /> },
      // Administration
      {
        path: paths.dashboard.administration.root,
        children: [
          // Users
          {
            path: paths.dashboard.administration.users.root,
            children: [
              {
                index: true,
                element: (
                  <RoleBasedGuard allowedPermissions={[usersPermissions.index]}>
                    <UsersPage />
                  </RoleBasedGuard>
                ),
              },
              {
                path: 'create',
                element: (
                  <RoleBasedGuard allowedPermissions={[usersPermissions.create]}>
                    <UsersFormPage />
                  </RoleBasedGuard>
                ),
              },
              {
                path: 'edit/:id',
                element: (
                  <RoleBasedGuard allowedPermissions={[usersPermissions.update]}>
                    <UsersFormPage />
                  </RoleBasedGuard>
                ),
              },
            ],
          },
          // Principals
          {
            path: paths.dashboard.administration.principals.root,
            children: [
              {
                index: true,
                element: (
                  <RoleBasedGuard allowedPermissions={[principalsPermissions.index]}>
                    <PrincipalsPage />
                  </RoleBasedGuard>
                ),
              },
              {
                path: 'create',
                element: (
                  <RoleBasedGuard allowedPermissions={[principalsPermissions.create]}>
                    <PrincipalsFormPage />
                  </RoleBasedGuard>
                ),
              },
              {
                path: 'edit/:id',
                element: (
                  <RoleBasedGuard allowedPermissions={[principalsPermissions.update]}>
                    <PrincipalsFormPage />
                  </RoleBasedGuard>
                ),
              },
            ],
          },
          // Principal Customers
          {
            path: paths.dashboard.administration.principalCustomers.root,
            children: [
              {
                index: true,
                element: (
                  <RoleBasedGuard allowedPermissions={[principalCustomersPermissions.index]}>
                    <PrincipalCustomersPage />
                  </RoleBasedGuard>
                ),
              },
              {
                path: 'create',
                element: (
                  <RoleBasedGuard allowedPermissions={[principalCustomersPermissions.create]}>
                    <PrincipalCustomersFormPage />
                  </RoleBasedGuard>
                ),
              },
              {
                path: 'edit/:id',
                element: (
                  <RoleBasedGuard allowedPermissions={[principalCustomersPermissions.update]}>
                    <PrincipalCustomersFormPage />
                  </RoleBasedGuard>
                ),
              },
            ],
          },
        ],
      },

      // Task management
      {
        path: paths.dashboard.tasksManagement.root,
        children: [
          {
            index: true,
            path: 'tasks',
            element: (
              <RoleBasedGuard allowedPermissions={[referencesTasksPermissions.index]}>
                <ReferencesTasksPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'task-templates',
            element: (
              <RoleBasedGuard allowedPermissions={[referencesTaskTemplatesPermissions.index]}>
                <ReferencesTaskTemplatesPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'task-template-categories',
            element: (
              <RoleBasedGuard
                allowedPermissions={[referencesTaskTemplateCategoriesPermissions.index]}
              >
                <ReferencesTaskTemplateCategoriesPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'task-recurrence',
            element: (
              <RoleBasedGuard allowedPermissions={[referencesTaskRecurrencePermissions.index]}>
                <ReferencesTaskRecurrencePage />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'attach-template-to-task',
            element: (
              <RoleBasedGuard allowedPermissions={[attachTemplateToTaskPermissions.index]}>
                <ReferencesAttachTemplateToTaskPage />
              </RoleBasedGuard>
            ),
          },
        ],
      },

      // Security
      {
        path: paths.dashboard.security.root,
        children: [
          {
            index: true,
            path: 'permission-groups',
            element: (
              <RoleBasedGuard allowedPermissions={[referencesPermissionGroupsPermissions.index]}>
                <ReferencesPermissionGroupsPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'permissions',
            element: (
              <RoleBasedGuard allowedPermissions={[referencesPermissionsPermissions.index]}>
                <ReferencesPermissionsPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'roles',
            element: (
              <RoleBasedGuard allowedPermissions={[referencesRolesPermissions.index]}>
                <ReferencesRolesPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'assign-permissions-to-roles',
            element: (
              <RoleBasedGuard allowedPermissions={[assignPermissionsToRolesPermissions.index]}>
                <ReferencesAssignPermissionsToRolesPage />
              </RoleBasedGuard>
            ),
          },
        ],
      },
      // Settings
      {
        path: paths.dashboard.settings.root,
        children: [
          {
            path: 'translations',
            element: (
              <RoleBasedGuard allowedPermissions={[referencesTranslationsPermissions.index]}>
                <ReferencesTranslationsPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'user-translations',
            element: (
              <RoleBasedGuard allowedPermissions={[referencesUserTranslationsPermissions.index]}>
                <ReferencesUserTranslationsPage />
              </RoleBasedGuard>
            ),
          },
        ],
      },
      // References
      {
        path: paths.dashboard.references.root,
        children: [
          {
            path: 'countries',
            index: true,
            element: (
              <RoleBasedGuard allowedPermissions={[referencesCountriesPermissions.index]}>
                <ReferencesCountriesPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'regions',
            element: (
              <RoleBasedGuard allowedPermissions={[referencesRegionsPermissions.index]}>
                <ReferencesRegionsPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'districts',
            element: (
              <RoleBasedGuard allowedPermissions={[referencesDistrictsPermissions.index]}>
                <ReferencesDistrictsPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'currencies',
            element: (
              <RoleBasedGuard allowedPermissions={[referencesCurrenciesPermissions.index]}>
                <ReferencesCurrenciesPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'client-types',
            element: (
              <RoleBasedGuard allowedPermissions={[referencesClientTypesPermissions.index]}>
                <ReferencesClientTypesPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'tariffs',
            element: (
              <RoleBasedGuard allowedPermissions={[referencesTariffsPermissions.index]}>
                <ReferencesTariffsPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'counterparties',
            element: (
              <RoleBasedGuard allowedPermissions={[referencesCounterpartiesPermissions.index]}>
                <ReferencesCounterpartiesPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'legal-forms',
            element: (
              <RoleBasedGuard allowedPermissions={[referencesLegalFormsPermissions.index]}>
                <ReferencesLegalFormsPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'services',
            element: (
              <RoleBasedGuard allowedPermissions={[referencesServicesPermissions.index]}>
                <ReferencesServicesPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'principal-customer-credentials',
            element: (
              <RoleBasedGuard
                allowedPermissions={[referencesPrincipalCustomerCredentialsPermissions.index]}
              >
                <ReferencesPrincipalCustomerCredentialsPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'attach-tariff-to-principal-customers',
            element: (
              <RoleBasedGuard
                allowedPermissions={[attachTariffToPrincipalCustomersPermissions.index]}
              >
                <ReferencesAttachTariffToPrincipalCustomersPage />
              </RoleBasedGuard>
            ),
          },
        ],
      },
    ],
  },
];
