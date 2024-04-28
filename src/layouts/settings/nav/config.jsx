import { Iconify } from '../../../components';
import PATHS from '../../../constants/paths';

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'My Account',
    path: PATHS.USER_ACCOUNT,
    icon: getIcon('eva:person-outline'),
    children: [
      {
        title: 'profile',
        path: PATHS.USER_ACCOUNT_PROFILE
      },
      {
        title: 'Addresses',
        path: PATHS.USER_ACCOUNT_ADDRESS
      },
      {
        title: 'Change Password',
        path: PATHS.USER_ACCOUNT_PASSWORD
      },
    ]
  },
  {
    title: 'My Orders',
    path: PATHS.USER_ORDERS,
    icon: getIcon('lets-icons:order')
  }
];

export default navConfig;
