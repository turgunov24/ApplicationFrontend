import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  user: icon('ic-user'),
};

// ----------------------------------------------------------------------

export const navData: NavSectionProps['data'] = [
  {
    subheader: 'Management',
    items: [
      {
        title: 'References',
        path: paths.dashboard.references.root,
        icon: ICONS.user,
        children: [
          {
            title: 'Services',
            path: paths.dashboard.references.services.root,
          },
          {
            title: 'Counterparties',
            path: paths.dashboard.references.counterparties.root,
          },
          {
            title: 'Principal Customer Credentials',
            path: paths.dashboard.references.principalCustomerCredentials.root,
          },
          {
            title: 'Legal Forms',
            path: paths.dashboard.references.legalForms.root,
          },
          {
            title: 'Client Types',
            path: paths.dashboard.references.clientTypes.root,
          },
          {
            title: 'Attach Tariff To Principal Customers',
            path: paths.dashboard.references.attachTariffToPrincipalCustomers.root,
          },
          {
            title: 'Tariffs',
            path: paths.dashboard.references.tariffs.root,
          },
          {
            title: 'Currencies',
            path: paths.dashboard.references.currencies.root,
          },
        ],
      },
    ],
  },
];
