import React, { FC } from 'react'
const Login = React.lazy(() => import('@/Pages/Login'))
const Register = React.lazy(() => import('@/Pages/Register'))
const Home = React.lazy(() => import('@/Pages/Home'))
const User = React.lazy(() => import('@/Pages/User'))
const Product = React.lazy(() => import('@/Pages/Product'))
const Blog = React.lazy(() => import('@/Pages/Blog'))

const NullLayout = React.lazy(() => import('@/Components/Layout/NullLayout'))
import { RouteProps } from '@/interfaces/routeProps.interface'

export const publicRoutes: RouteProps[] = [
  { title: 'Home', path: '/', element: Home, private: true },

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
    element: User,
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
]
