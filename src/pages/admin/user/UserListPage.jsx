import React from 'react';

import { AdminPageLayout } from '../common';
import { UserList } from '../../../features/admin/users';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'User', path: '/admin/users' },
  { label: 'List' },
];

const UserListPage = () => {
  return (
    <AdminPageLayout
      pageTitle='User List'
      pageHeaderName='Users'
      breadcrumbs={breadcrumbs}
      showCreateButton={true}
      createName='User'
      createPath='/admin/users/create'
    >
      <UserList />
    </AdminPageLayout>
  );
};

export default UserListPage;
