import { RouteProps } from '@/interfaces/routeProps.interface';
import React from 'react';
const Login = React.lazy(() => import('@/Pages/Admin/Login'));
const Register = React.lazy(() => import('@/Pages/Admin/Register'));
const Dashboard = React.lazy(() => import('@/Pages/Admin/Dashboard'));
const Users = React.lazy(() => import('@/Pages/Admin/Users'));
const Product = React.lazy(() => import('@/Pages/Admin/Product'));
const Blog = React.lazy(() => import('@/Pages/Admin/Blog'));

const NullLayout = React.lazy(() => import('@/Layout/NullLayout'));

export const publicRoutes: RouteProps[] = [
  { title: 'Dashboard', path: '/dashboard', element: Dashboard, private: true },

  {
    title: 'Login',
    path: '/login',
    element: Login,
    layout: NullLayout,
    private: false,
  },
  {
    title: 'Register',
    path: '/register',
    element: Register,
    layout: NullLayout,
    private: false,
  },
  {
    title: 'User',
    path: '/user',
    element: Users,
    private: true,
  },
  {
    title: 'Product',
    path: '/products',
    element: Product,
    private: false,
  },
  {
    title: 'Blog',
    path: '/blog',
    element: Blog,
    private: false,
  },
];
