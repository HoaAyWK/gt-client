import { Iconify } from  '../../../components';

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'GENERAL',
  },
    {
        title: 'dashboard',
        path: '/admin/dashboard',
        icon: getIcon('ri:dashboard-3-line'),
    },
  {
    title: 'MANAGEMENT'
  },
    {
        title: 'user',
        path: '/admin/users',
        icon: getIcon('eva:people-fill'),
        children: [
          {
            title: 'list',
            path: '/admin/users/list',
          },
          {
            title: 'create',
            path: '/admin/users/create'
          }
        ]
    },
    {
      title: 'product origin',
      path: '/admin/product-origins',
      icon: getIcon('icon-park-outline:ad-product'),
      children: [
        {
          title: 'list',
          path: '/admin/product-origins/list'
        },
        {
          title: 'create',
          path: '/admin/product-origins/create'
        },
      ]
    },
    {
      title: 'product variant',
      path: '/admin/product-variants',
      icon: getIcon('fluent-mdl2:product-variant'),
      children: [
        {
          title: 'list',
          path: '/admin/product-variants/list'
        },
        {
          title: 'create',
          path: '/admin/product-variants/create'
        },
      ]
    },
    {
        title: 'category',
        path: '/admin/categories',
        icon: getIcon('bxs:category'),
    },
    {
        title: 'brand',
        path: '/admin/brands',
        icon: getIcon('mdi:alpha-a-circle'),
    },
    {
        title: 'order',
        path: '/admin/orders',
        icon: getIcon('solar:delivery-bold'),
    },
    {
      title: 'warehouse',
      path: '/admin/warehouse',
      icon: getIcon('material-symbols:inventory-2-outline-rounded')
    },
    {
      title: 'banners',
      path: '/admin/banners',
      icon: getIcon('ri:advertisement-fill')
    }
];

export default navConfig;
