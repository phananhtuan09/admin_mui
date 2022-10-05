// component
import Iconify from '@/Components/Global/Iconify'
import React from 'react'
// ----------------------------------------------------------------------

const getIcon = (name: string) => <Iconify icon={name} width={22} height={22} />

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'user',
    path: '/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'product',
    path: '/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'blog',
    path: '/blog',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
]

export default navConfig
