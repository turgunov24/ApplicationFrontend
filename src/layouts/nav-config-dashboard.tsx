import type { TFunction } from 'i18next'
import type { NavSectionProps } from 'src/components/nav-section'

import { paths } from 'src/routes/paths'

import { CONFIG } from 'src/global-config'

import { SvgColor } from 'src/components/svg-color'

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  user: icon('ic-user'),
  dashboard: icon('ic-dashboard'),
  folder: icon('ic-folder'),
};

// ----------------------------------------------------------------------

export function navData(t: TFunction<'navbar', undefined>): NavSectionProps['data'] {
  return [
    {
      subheader: t('management'),
      items: [
        {
          title: t('administration'),
          path: paths.dashboard.administration.root,
          icon: ICONS.dashboard,
          children: [
            {
              title: t('principalCustomers'),
              path: paths.dashboard.administration.principalCustomers.root,
              icon: ICONS.user,
            },
            {
              title: t('Principal Customer Credentials'),
              path: paths.dashboard.administration.principalCustomerCredentials.root,
              icon: ICONS.folder,
            },
          ],
        },
        {
          title: t('references'),
          path: paths.dashboard.references.root,
          icon: ICONS.user,
          children: [
            {
              title: t('services'),
              path: paths.dashboard.references.services.root,
            },
            {
              title: t('counterparties'),
              path: paths.dashboard.references.counterparties.root,
            },
            {
              title: t('legal-forms'),
              path: paths.dashboard.references.legalForms.root,
            },
            {
              title: t('client-types'),
              path: paths.dashboard.references.clientTypes.root,
            },
            {
              title: t('attach-tariff-to-principal-customers'),
              path: paths.dashboard.references.attachTariffToPrincipalCustomers.root,
            },
            {
              title: t('tariffs'),
              path: paths.dashboard.references.tariffs.root,
            },
            {
              title: t('currencies'),
              path: paths.dashboard.references.currencies.root,
            },
          ],
        },
      ],
    },
  ];
}
