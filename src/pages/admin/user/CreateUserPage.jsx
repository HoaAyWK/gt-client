import React from 'react';
import { useSelector } from 'react-redux';

import { AdminPageLayout } from '../common';
import { UserForm } from '../../../features/admin/users';
import { createUser } from '../../../features/admin/users/userSlice';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'User', path: '/admin/users' },
  { label: 'Create new user' },
];

const CreateUserPage = () => {
  const { createUserStatus } = useSelector((state) => state.adminUsers);

  return (
    <AdminPageLayout
      pageTitle='Create a new user'
      pageHeaderName='Create user'
      showCreateButton={false}
      breadcrumbs={breadcrumbs}
    >
      <UserForm isEdit={false} action={createUser} status={createUserStatus} />
    </AdminPageLayout>
  );
};

export default CreateUserPage;
