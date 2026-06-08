import type { TFunction } from 'i18next';
import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';
import { usersPermissions } from 'src/pages/core/admin/users/helpers/permissions';
import { principalsPermissions } from 'src/pages/core/admin/principals/helpers/permissions';
import { referencesRolesPermissions } from 'src/pages/core/references/roles/helpers/permissions';
import { referencesTasksPermissions } from 'src/pages/core/references/tasks/helpers/permissions';
import { referencesTariffsPermissions } from 'src/pages/core/references/tariffs/helpers/permissions';
import { referencesRegionsPermissions } from 'src/pages/core/references/regions/helpers/permissions';
import { referencesServicesPermissions } from 'src/pages/core/references/services/helpers/permissions';
import { referencesCountriesPermissions } from 'src/pages/core/references/countries/helpers/permissions';
import { referencesDistrictsPermissions } from 'src/pages/core/references/districts/helpers/permissions';
import { referencesCurrenciesPermissions } from 'src/pages/core/references/currencies/helpers/permissions';
import { referencesLegalFormsPermissions } from 'src/pages/core/references/legal-forms/helpers/permissions';
import { principalCustomersPermissions } from 'src/pages/core/admin/principal-customers/helpers/permissions';
import { referencesPermissionsPermissions } from 'src/pages/core/references/permissions/helpers/permissions';
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
export function navData(t: TFunction<'navbar', undefined>): NavSectionProps['data'] {
  return [
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
      subheader: t('management'),
      items: [
        {
          title: t('dashboard'),
          path: paths.dashboard.root,
          icon: ICONS.dashboard,
        },
        // Administration
        {
          title: t('administration'),
          path: paths.dashboard.administration.root,
          icon: ICONS.dashboard,
          allowedPermissions: [
            usersPermissions.index,
            principalsPermissions.index,
            principalCustomersPermissions.index,
          ],
          children: [
            {
              title: t('users'),
              path: paths.dashboard.administration.users.root,
              icon: ICONS.user,
              allowedPermissions: [usersPermissions.index],
            },
            {
              title: t('principals'),
              path: paths.dashboard.administration.principals.root,
              icon: ICONS.user,
              allowedPermissions: [principalsPermissions.index],
            },
            {
              title: t('principalCustomers'),
              path: paths.dashboard.administration.principalCustomers.root,
              icon: ICONS.user,
              allowedPermissions: [principalCustomersPermissions.index],
            },
          ],
        },
        // Security
        {
          title: t('security'),
          path: paths.dashboard.security.root,
          icon: ICONS.user,
          children: [
            {
              title: t('permissionGroups'),
              path: paths.dashboard.security.permissionGroups.root,
              allowedPermissions: [referencesPermissionGroupsPermissions.index],
            },
            {
              title: t('permissions'),
              path: paths.dashboard.security.permissions.root,
              allowedPermissions: [referencesPermissionsPermissions.index],
            },
            {
              title: t('roles'),
              path: paths.dashboard.security.roles.root,
              allowedPermissions: [referencesRolesPermissions.index],
            },
            {
              title: t('assignPermissionsToRoles'),
              path: paths.dashboard.security.assignPermissionsToRoles.root,
              allowedPermissions: [assignPermissionsToRolesPermissions.index],
            },
          ],
        },
        // Tasks management
        {
          title: t('taskManagement'),
          path: paths.dashboard.tasksManagement.root,
          icon: ICONS.user,
          children: [
            {
              title: t('tasks'),
              path: paths.dashboard.tasksManagement.tasks.root,
              allowedPermissions: [referencesTasksPermissions.index],
            },
            {
              title: t('taskTemplates'),
              path: paths.dashboard.tasksManagement.taskTemplates.root,
              allowedPermissions: [referencesTaskTemplatesPermissions.index],
            },
            {
              title: t('taskTemplateCategories'),
              path: paths.dashboard.tasksManagement.taskTemplateCategories.root,
              allowedPermissions: [referencesTaskTemplateCategoriesPermissions.index],
            },
            {
              title: t('taskRecurrence'),
              path: paths.dashboard.tasksManagement.taskRecurrence.root,
              allowedPermissions: [referencesTaskRecurrencePermissions.index],
            },
            {
              title: t('attachTemplateToTask'),
              path: paths.dashboard.tasksManagement.attachTemplateToTask.root,
              allowedPermissions: [attachTemplateToTaskPermissions.index],
            },
          ],
        },
        // References
        {
          title: t('references'),
          path: paths.dashboard.references.root,
          icon: ICONS.user,
          children: [
            {
              title: t('countries'),
              path: paths.dashboard.references.countries.root,
              allowedPermissions: [referencesCountriesPermissions.index],
            },
            {
              title: t('regions'),
              path: paths.dashboard.references.regions.root,
              allowedPermissions: [referencesRegionsPermissions.index],
            },
            {
              title: t('districts'),
              path: paths.dashboard.references.districts.root,
              allowedPermissions: [referencesDistrictsPermissions.index],
            },
            {
              title: t('currencies'),
              path: paths.dashboard.references.currencies.root,
              allowedPermissions: [referencesCurrenciesPermissions.index],
            },
            {
              title: t('clientTypes'),
              path: paths.dashboard.references.clientTypes.root,
              allowedPermissions: [referencesClientTypesPermissions.index],
            },
            {
              title: t('tariffs'),
              path: paths.dashboard.references.tariffs.root,
              allowedPermissions: [referencesTariffsPermissions.index],
            },
            {
              title: t('counterparties'),
              path: paths.dashboard.references.counterparties.root,
              allowedPermissions: [referencesCounterpartiesPermissions.index],
            },
            {
              title: t('legalForms'),
              path: paths.dashboard.references.legalForms.root,
              allowedPermissions: [referencesLegalFormsPermissions.index],
            },
            {
              title: t('services'),
              path: paths.dashboard.references.services.root,
              allowedPermissions: [referencesServicesPermissions.index],
            },
            {
              title: t('principalCustomerCredentials'),
              path: paths.dashboard.references.principalCustomerCredentials.root,
              allowedPermissions: [referencesPrincipalCustomerCredentialsPermissions.index],
            },
            {
              title: t('attachTariffToPrincipalCustomers'),
              path: paths.dashboard.references.attachTariffToPrincipalCustomers.root,
              allowedPermissions: [attachTariffToPrincipalCustomersPermissions.index],
            },
          ],
        },
        // Settings
        {
          title: t('settings'),
          path: paths.dashboard.settings.root,
          icon: ICONS.user,
          children: [
            {
              title: t('generalTranslations'),
              path: paths.dashboard.settings.translations.root,
              allowedPermissions: [referencesTranslationsPermissions.index],
            },
            {
              title: t('customTranslations'),
              path: paths.dashboard.settings.userTranslations.root,
              allowedPermissions: [referencesUserTranslationsPermissions.index],
            },
          ],
        },
      ],
    },
  ];
}
