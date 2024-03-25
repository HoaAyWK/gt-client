import { Iconify } from '../../../components';

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'profile',
    path: '/settings/profile',
    icon: getIcon('eva:person-outline'),
  },
  {
    title: 'password',
    path: '/settings/password',
    icon: getIcon('mdi:password'),
  },
  {
    title: 'account',
    path: '/settings/admin',
    icon: getIcon('ep:setting')
  }
];

export default navConfig;
