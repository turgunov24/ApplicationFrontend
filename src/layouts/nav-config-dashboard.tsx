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
  label: icon('ic-label'),
  folder: icon('ic-folder'),
  dashboard: icon('ic-dashboard'),
};

// ----------------------------------------------------------------------

export const navData: NavSectionProps['data'] = [
  {
    subheader: 'Management',
    items: [
      {
        title: 'Client Types',
        path: paths.dashboard.references.clientTypes.root,
        icon: ICONS.label,
      },
      {
        title: 'Principal Customers',
        path: paths.dashboard.principalCustomers.root,
        icon: ICONS.user,
      },
    ],
  },
];
