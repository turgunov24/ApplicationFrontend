import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';
import { usersPermissions } from 'src/pages/core/admin/users/helpers/permissions';
import { principalsPermissions } from 'src/pages/core/admin/principals/helpers/permissions';
import { referencesRolesPermissions } from 'src/pages/core/references/roles/helpers/permissions';
import { referencesTariffsPermissions } from 'src/pages/core/references/tariffs/helpers/permissions';
import { referencesRegionsPermissions } from 'src/pages/core/references/regions/helpers/permissions';
import { referencesCountriesPermissions } from 'src/pages/core/references/countries/helpers/permissions';
import { referencesDistrictsPermissions } from 'src/pages/core/references/districts/helpers/permissions';
import { referencesCurrenciesPermissions } from 'src/pages/core/references/currencies/helpers/permissions';
import { principalCustomersPermissions } from 'src/pages/core/admin/principal-customers/helpers/permissions';
import { referencesPermissionsPermissions } from 'src/pages/core/references/permissions/helpers/permissions';
import { referencesClientTypesPermissions } from 'src/pages/core/references/client-types/helpers/permissions';
import { referencesPermissionGroupsPermissions } from 'src/pages/core/references/permission-groups/helpers/permissions';
import { assignPermissionsToRolesPermissions } from 'src/pages/core/references/assign-permissions-to-roles/helpers/permissions';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  params: icon('ic-params'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  subpaths: icon('ic-subpaths'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
};

// ----------------------------------------------------------------------

/**
 * Input nav data is an array of navigation section items used to define the structure and content of a navigation bar.
 * Each section contains a subheader and an array of items, which can include nested children items.
 *
 * Each item can have the following properties:
 * - `title`: The title of the navigation item.
 * - `path`: The URL path the item links to.
 * - `icon`: An optional icon component to display alongside the title.
 * - `info`: Optional additional information to display, such as a label.
 * - `allowedRoles(allowedPermissions ga o'zgardi)`: An optional array of roles that are allowed to see the item.
 * - `caption`: An optional caption to display below the title.
 * - `children`: An optional array of nested navigation items.
 * - `disabled`: An optional boolean to disable the item.
 * - `deepMatch`: An optional boolean to indicate if the item should match subpaths.
 */
export const navData: NavSectionProps['data'] = [
  /**
   * Overview
   */
  // {
  //   subheader: 'Overview',
  //   items: [
  //     { title: 'App', path: paths.dashboard.root, icon: ICONS.dashboard },
  //     { title: 'Ecommerce', path: paths.dashboard.general.ecommerce, icon: ICONS.ecommerce },
  //     { title: 'Analytics', path: paths.dashboard.general.analytics, icon: ICONS.analytics },
  //     { title: 'Banking', path: paths.dashboard.general.banking, icon: ICONS.banking },
  //     { title: 'Booking', path: paths.dashboard.general.booking, icon: ICONS.booking },
  //     { title: 'File', path: paths.dashboard.general.file, icon: ICONS.file },
  //     { title: 'Course', path: paths.dashboard.general.course, icon: ICONS.course },
  //   ],
  // },
  /**
   * Management
   */
  {
    subheader: 'Management',
    items: [
      {
        title: 'Users',
        path: paths.dashboard.users.root,
        icon: ICONS.user,
        allowedPermissions: [usersPermissions.index],
      },
      {
        title: 'Principals',
        path: paths.dashboard.principals.root,
        icon: ICONS.user,
        allowedPermissions: [principalsPermissions.index],
      },
      {
        title: 'Principal Customers',
        path: paths.dashboard.principalCustomers.root,
        icon: ICONS.user,
        allowedPermissions: [principalCustomersPermissions.index],
      },
      {
        title: 'References',
        path: paths.dashboard.references.root,
        icon: ICONS.user,
        children: [
          {
            title: 'Countries',
            path: paths.dashboard.references.countries.root,
            allowedPermissions: [referencesCountriesPermissions.index],
          },
          {
            title: 'Regions',
            path: paths.dashboard.references.regions.root,
            allowedPermissions: [referencesRegionsPermissions.index],
          },
          {
            title: 'Districts',
            path: paths.dashboard.references.districts.root,
            allowedPermissions: [referencesDistrictsPermissions.index],
          },
          {
            title: 'Permission Groups',
            path: paths.dashboard.references.permissionGroups.root,
            allowedPermissions: [referencesPermissionGroupsPermissions.index],
          },
          {
            title: 'Permissions',
            path: paths.dashboard.references.permissions.root,
            allowedPermissions: [referencesPermissionsPermissions.index],
          },
          {
            title: 'Roles',
            path: paths.dashboard.references.roles.root,
            allowedPermissions: [referencesRolesPermissions.index],
          },
          {
            title: 'Assign Permissions to Roles',
            path: paths.dashboard.references.assignPermissionsToRoles.root,
            allowedPermissions: [assignPermissionsToRolesPermissions.index],
          },
          {
            title: 'Currencies',
            path: paths.dashboard.references.currencies.root,
            allowedPermissions: [referencesCurrenciesPermissions.index],
          },
          {
            title: 'Client Types',
            path: paths.dashboard.references.clientTypes.root,
            allowedPermissions: [referencesClientTypesPermissions.index],
          },
          {
            title: 'Tariffs',
            path: paths.dashboard.references.tariffs.root,
            allowedPermissions: [referencesTariffsPermissions.index],
          },
        ],
      },
      // {
      //   title: 'User',
      //   path: paths.dashboard.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'Profile', path: paths.dashboard.user.root },
      //     { title: 'Cards', path: paths.dashboard.user.cards },
      //     { title: 'All', path: paths.dashboard.user.all },
      //     { title: 'List', path: paths.dashboard.user.list },
      //     { title: 'Create', path: paths.dashboard.user.new },
      //     { title: 'Edit', path: paths.dashboard.user.demo.edit },
      //     { title: 'Account', path: paths.dashboard.user.account, deepMatch: true },
      //   ],
      // },
      // {
      //   title: 'Product',
      //   path: paths.dashboard.product.root,
      //   icon: ICONS.product,
      //   children: [
      //     { title: 'List', path: paths.dashboard.product.root },
      //     { title: 'Details', path: paths.dashboard.product.demo.details },
      //     { title: 'Create', path: paths.dashboard.product.new },
      //     { title: 'Edit', path: paths.dashboard.product.demo.edit },
      //   ],
      // },
      // {
      //   title: 'Order',
      //   path: paths.dashboard.order.root,
      //   icon: ICONS.order,
      //   children: [
      //     { title: 'List', path: paths.dashboard.order.root },
      //     { title: 'Details', path: paths.dashboard.order.demo.details },
      //   ],
      // },
      // {
      //   title: 'Invoice',
      //   path: paths.dashboard.invoice.root,
      //   icon: ICONS.invoice,
      //   children: [
      //     { title: 'List', path: paths.dashboard.invoice.root },
      //     { title: 'Details', path: paths.dashboard.invoice.demo.details },
      //     { title: 'Create', path: paths.dashboard.invoice.new },
      //     { title: 'Edit', path: paths.dashboard.invoice.demo.edit },
      //   ],
      // },
      // {
      //   title: 'Blog',
      //   path: paths.dashboard.post.root,
      //   icon: ICONS.blog,
      //   children: [
      //     { title: 'List', path: paths.dashboard.post.root },
      //     { title: 'Details', path: paths.dashboard.post.demo.details },
      //     { title: 'Create', path: paths.dashboard.post.new },
      //     { title: 'Edit', path: paths.dashboard.post.demo.edit },
      //   ],
      // },
      // {
      //   title: 'Job',
      //   path: paths.dashboard.job.root,
      //   icon: ICONS.job,
      //   children: [
      //     { title: 'List', path: paths.dashboard.job.root },
      //     { title: 'Details', path: paths.dashboard.job.demo.details },
      //     { title: 'Create', path: paths.dashboard.job.new },
      //     { title: 'Edit', path: paths.dashboard.job.demo.edit },
      //   ],
      // },
      // {
      //   title: 'Tour',
      //   path: paths.dashboard.tour.root,
      //   icon: ICONS.tour,
      //   children: [
      //     { title: 'List', path: paths.dashboard.tour.root },
      //     { title: 'Details', path: paths.dashboard.tour.demo.details },
      //     { title: 'Create', path: paths.dashboard.tour.new },
      //     { title: 'Edit', path: paths.dashboard.tour.demo.edit },
      //   ],
      // },
      // { title: 'File manager', path: paths.dashboard.fileManager, icon: ICONS.folder },
      // {
      //   title: 'Mail',
      //   path: paths.dashboard.mail,
      //   icon: ICONS.mail,
      //   info: (
      //     <Label color="error" variant="inverted">
      //       +32
      //     </Label>
      //   ),
      // },
      // { title: 'Chat', path: paths.dashboard.chat, icon: ICONS.chat },
      // { title: 'Calendar', path: paths.dashboard.calendar, icon: ICONS.calendar },
      // { title: 'Kanban', path: paths.dashboard.kanban, icon: ICONS.kanban },
    ],
  },
  /**
   * Item state
   */
  // {
  //   subheader: 'Misc',
  //   items: [
  //     {
  //       /**
  //        * Permissions can be set for each item by using the `allowedRoles(allowedPermissions ga o'zgardi)` property.
  //        * - If `allowedRoles(allowedPermissions ga o'zgardi)` is not set (default), all roles can see the item.
  //        * - If `allowedRoles(allowedPermissions ga o'zgardi)` is an empty array `[]`, no one can see the item.
  //        * - If `allowedRoles(allowedPermissions ga o'zgardi)` contains specific roles, only those roles can see the item.
  //        *
  //        * Examples:
  //        * - `allowedRoles(allowedPermissions ga o'zgardi): ['user'](action: PermissionActions.READ, resource: '')` - only users with the 'user' role can see this item.
  //        * - `allowedRoles(allowedPermissions ga o'zgardi): ['admin'](action: PermissionActions.READ, resource: '')` - only users with the 'admin' role can see this item.
  //        * - `allowedRoles(allowedPermissions ga o'zgardi): ['admin', 'manager'](action: PermissionActions.READ, resource: '')` - only users with the 'admin' or 'manager' roles can see this item.
  //        *
  //        * Combine with the `checkPermissions` prop to build conditional expressions.
  //        * Example usage can be found in: src/sections/_examples/extra/navigation-bar-view/nav-vertical.{jsx | tsx}
  //        */
  //       title: 'Permission',
  //       path: paths.dashboard.permission,
  //       icon: ICONS.lock,
  //       // allowedRoles: ['admin', 'manager'],
  //       caption: 'Only admin can see this item.',
  //     },
  //     {
  //       title: 'Level',
  //       path: '#/dashboard/menu-level',
  //       icon: ICONS.menuItem,
  //       children: [
  //         {
  //           title: 'Level 1a',
  //           path: '#/dashboard/menu-level/1a',
  //           children: [
  //             { title: 'Level 2a', path: '#/dashboard/menu-level/1a/2a' },
  //             {
  //               title: 'Level 2b',
  //               path: '#/dashboard/menu-level/1a/2b',
  //               children: [
  //                 {
  //                   title: 'Level 3a',
  //                   path: '#/dashboard/menu-level/1a/2b/3a',
  //                 },
  //                 {
  //                   title: 'Level 3b',
  //                   path: '#/dashboard/menu-level/1a/2b/3b',
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //         { title: 'Level 1b', path: '#/dashboard/menu-level/1b' },
  //       ],
  //     },
  //     {
  //       title: 'Disabled',
  //       path: '#disabled',
  //       icon: ICONS.disabled,
  //       disabled: true,
  //     },
  //     {
  //       title: 'Label',
  //       path: '#label',
  //       icon: ICONS.label,
  //       info: (
  //         <Label
  //           color="info"
  //           variant="inverted"
  //           startIcon={<Iconify icon="solar:bell-bing-bold-duotone" />}
  //         >
  //           NEW
  //         </Label>
  //       ),
  //     },
  //     {
  //       title: 'Caption',
  //       path: '#caption',
  //       icon: ICONS.menuItem,
  //       caption:
  //         'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
  //     },
  //     {
  //       title: 'Params',
  //       path: '/dashboard/params?id=e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
  //       icon: ICONS.params,
  //     },
  //     {
  //       title: 'Subpaths',
  //       path: '/dashboard/subpaths',
  //       icon: ICONS.subpaths,
  //       deepMatch: true,
  //     },
  //     {
  //       title: 'External link',
  //       path: 'https://www.google.com/',
  //       icon: ICONS.external,
  //       info: <Iconify width={18} icon="eva:external-link-fill" />,
  //     },
  //     { title: 'Blank', path: paths.dashboard.blank, icon: ICONS.blank },
  //   ],
  // },
];
