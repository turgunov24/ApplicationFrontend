import type { RouteObject } from 'react-router'

import { Outlet } from 'react-router'
import { lazy, Suspense } from 'react'

import { CONFIG } from 'src/global-config'
import { DashboardLayout } from 'src/layouts/dashboard'
import { usersPermissions } from 'src/pages/core/admin/users/helpers/permissions'
import { referencesRolesPermissions } from 'src/pages/core/references/roles/helpers/permissions'
import { referencesRegionsPermissions } from 'src/pages/core/references/regions/helpers/permissions'
import { referencesDistrictsPermissions } from 'src/pages/core/references/districts/helpers/permissions'
import { referencesCountriesPermissions } from 'src/pages/core/references/countries/helpers/permissions'
import { referencesPermissionsPermissions } from 'src/pages/core/references/permissions/helpers/permissions'
import { referencesPermissionGroupsPermissions } from 'src/pages/core/references/permission-groups/helpers/permissions'
import { assignPermissionsToRolesPermissions } from 'src/pages/core/references/assign-permissions-to-roles/helpers/permissions'

import { LoadingScreen } from 'src/components/loading-screen'

import { AccountLayout } from 'src/sections/account/account-layout'

import { AuthGuard, RoleBasedGuard } from 'src/auth/guard'

import { usePathname } from '../hooks'

// ----------------------------------------------------------------------

// Overview
const IndexPage = lazy(() => import('src/pages/dashboard'));
// const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
// const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
// const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'));
// const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'));
// const OverviewFilePage = lazy(() => import('src/pages/dashboard/file'));
// const OverviewCoursePage = lazy(() => import('src/pages/dashboard/course'));
// // Product
// const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
// const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
// const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'));
// const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));
// // Order
// const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'));
// const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'));
// // Invoice
// const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoice/list'));
// const InvoiceDetailsPage = lazy(() => import('src/pages/dashboard/invoice/details'));
// const InvoiceCreatePage = lazy(() => import('src/pages/dashboard/invoice/new'));
// const InvoiceEditPage = lazy(() => import('src/pages/dashboard/invoice/edit'));
// // User
// const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
// const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
// const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
// const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
// const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));
// // Account
// const AccountGeneralPage = lazy(() => import('src/pages/dashboard/user/account/general'));
// const AccountBillingPage = lazy(() => import('src/pages/dashboard/user/account/billing'));
// const AccountSocialsPage = lazy(() => import('src/pages/dashboard/user/account/socials'));
// const AccountNotificationsPage = lazy(
//   () => import('src/pages/dashboard/user/account/notifications')
// );
// const AccountChangePasswordPage = lazy(
//   () => import('src/pages/dashboard/user/account/change-password')
// );
// // Blog
// const BlogPostsPage = lazy(() => import('src/pages/dashboard/post/list'));
// const BlogPostPage = lazy(() => import('src/pages/dashboard/post/details'));
// const BlogNewPostPage = lazy(() => import('src/pages/dashboard/post/new'));
// const BlogEditPostPage = lazy(() => import('src/pages/dashboard/post/edit'));
// // Job
// const JobDetailsPage = lazy(() => import('src/pages/dashboard/job/details'));
// const JobListPage = lazy(() => import('src/pages/dashboard/job/list'));
// const JobCreatePage = lazy(() => import('src/pages/dashboard/job/new'));
// const JobEditPage = lazy(() => import('src/pages/dashboard/job/edit'));
// // Tour
// const TourDetailsPage = lazy(() => import('src/pages/dashboard/tour/details'));
// const TourListPage = lazy(() => import('src/pages/dashboard/tour/list'));
// const TourCreatePage = lazy(() => import('src/pages/dashboard/tour/new'));
// const TourEditPage = lazy(() => import('src/pages/dashboard/tour/edit'));
// // File manager
// const FileManagerPage = lazy(() => import('src/pages/dashboard/file-manager'));
// // App
// const ChatPage = lazy(() => import('src/pages/dashboard/chat'));
// const MailPage = lazy(() => import('src/pages/dashboard/mail'));
// const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));
// const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'));
// // Test render page by role
// const PermissionDeniedPage = lazy(() => import('src/pages/dashboard/permission'));
// // Blank page
// const ParamsPage = lazy(() => import('src/pages/dashboard/params'));
// const SubpathsPage = lazy(() => import('src/pages/dashboard/subpaths'));
// const BlankPage = lazy(() => import('src/pages/dashboard/blank'));

// ----------------------------------------------------------------------

const UsersPage = lazy(() => import('src/pages/core/admin/users/index'));
const UsersFormPage = lazy(() => import('src/pages/core/admin/users/form'));

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

const accountLayout = () => (
  <AccountLayout>
    <SuspenseOutlet />
  </AccountLayout>
);

export const dashboardRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? dashboardLayout() : <AuthGuard>{dashboardLayout()}</AuthGuard>,
    children: [
      { index: true, element: <IndexPage /> },
      // { path: 'ecommerce', element: <OverviewEcommercePage /> },
      // { path: 'analytics', element: <OverviewAnalyticsPage /> },
      // { path: 'banking', element: <OverviewBankingPage /> },
      // { path: 'booking', element: <OverviewBookingPage /> },
      // { path: 'file', element: <OverviewFilePage /> },
      // { path: 'course', element: <OverviewCoursePage /> },
      {
        path: 'users',
        children: [
          {
            index: true,
            element: (
              <RoleBasedGuard allowedPermissions={[usersPermissions.index]}>
                <UsersPage />
              </RoleBasedGuard>
            ),
            // loader: () => {
            //   console.log('loader');
            //   return false;
            // },
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
      {
        path: 'references',
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
      // {
      //   path: 'user',
      //   children: [
      //     { index: true, element: <UserProfilePage /> },
      //     { path: 'profile', element: <UserProfilePage /> },
      //     { path: 'cards', element: <UserCardsPage /> },
      //     { path: 'list', element: <UserListPage /> },
      //     { path: 'new', element: <UserCreatePage /> },
      //     { path: ':id/edit', element: <UserEditPage /> },
      //     {
      //       path: 'account',
      //       element: accountLayout(),
      //       children: [
      //         { index: true, element: <AccountGeneralPage /> },
      //         { path: 'billing', element: <AccountBillingPage /> },
      //         { path: 'notifications', element: <AccountNotificationsPage /> },
      //         { path: 'socials', element: <AccountSocialsPage /> },
      //         { path: 'change-password', element: <AccountChangePasswordPage /> },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: 'product',
      //   children: [
      //     { index: true, element: <ProductListPage /> },
      //     { path: 'list', element: <ProductListPage /> },
      //     { path: ':id', element: <ProductDetailsPage /> },
      //     { path: 'new', element: <ProductCreatePage /> },
      //     { path: ':id/edit', element: <ProductEditPage /> },
      //   ],
      // },
      // {
      //   path: 'order',
      //   children: [
      //     { index: true, element: <OrderListPage /> },
      //     { path: 'list', element: <OrderListPage /> },
      //     { path: ':id', element: <OrderDetailsPage /> },
      //   ],
      // },
      // {
      //   path: 'invoice',
      //   children: [
      //     { index: true, element: <InvoiceListPage /> },
      //     { path: 'list', element: <InvoiceListPage /> },
      //     { path: ':id', element: <InvoiceDetailsPage /> },
      //     { path: ':id/edit', element: <InvoiceEditPage /> },
      //     { path: 'new', element: <InvoiceCreatePage /> },
      //   ],
      // },
      // {
      //   path: 'post',
      //   children: [
      //     { index: true, element: <BlogPostsPage /> },
      //     { path: 'list', element: <BlogPostsPage /> },
      //     { path: ':title', element: <BlogPostPage /> },
      //     { path: ':title/edit', element: <BlogEditPostPage /> },
      //     { path: 'new', element: <BlogNewPostPage /> },
      //   ],
      // },
      // {
      //   path: 'job',
      //   children: [
      //     { index: true, element: <JobListPage /> },
      //     { path: 'list', element: <JobListPage /> },
      //     { path: ':id', element: <JobDetailsPage /> },
      //     { path: 'new', element: <JobCreatePage /> },
      //     { path: ':id/edit', element: <JobEditPage /> },
      //   ],
      // },
      // {
      //   path: 'tour',
      //   children: [
      //     { index: true, element: <TourListPage /> },
      //     { path: 'list', element: <TourListPage /> },
      //     { path: ':id', element: <TourDetailsPage /> },
      //     { path: 'new', element: <TourCreatePage /> },
      //     { path: ':id/edit', element: <TourEditPage /> },
      //   ],
      // },
      // { path: 'file-manager', element: <FileManagerPage /> },
      // { path: 'mail', element: <MailPage /> },
      // { path: 'chat', element: <ChatPage /> },
      // { path: 'calendar', element: <CalendarPage /> },
      // { path: 'kanban', element: <KanbanPage /> },
      // { path: 'permission', element: <PermissionDeniedPage /> },
      // { path: 'params', element: <ParamsPage /> },
      // { path: 'blank', element: <BlankPage /> },
      // {
      //   path: 'subpaths',
      //   children: [
      //     {
      //       index: true,
      //       element: <Navigate to="/dashboard/subpaths/sub-1/sub-2" />,
      //     },
      //     { path: 'sub-1/sub-2', element: <SubpathsPage /> },
      //   ],
      // },
    ],
  },
];
