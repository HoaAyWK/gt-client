import React from 'react';
import { useParams } from 'react-router-dom';

import { AdminPageLayout } from '../common';
import { EditUser } from '../../../features/admin/users';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'User', path: '/admin/users' },
  { label: 'Update user' },
];

const CreateUserPage = () => {
  const { id } = useParams();

  return (
    <AdminPageLayout
      pageTitle='Update user'
      pageHeaderName='Update user'
      showCreateButton={false}
      breadcrumbs={breadcrumbs}
    >
      <EditUser id={id} />
    </AdminPageLayout>
  );
};

export default CreateUserPage;
