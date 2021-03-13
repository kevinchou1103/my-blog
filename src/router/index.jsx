import React from 'react'
import { Redirect } from 'react-router-dom'
import pages from '@/pages'

const MBHome = React.lazy(_ => import('@/pages/home'));
const MBMine = React.lazy(_ => import('@/pages/mine'));
const MBLogin = React.lazy(_ => import('@/pages/login'));

const routes = [
  {
    path: '/',
    exact: true,
    render: () => (<Redirect to="Home"/>)
  },
  {
    path: '/home',
    component: MBHome
  },
  {
    path: '/login',
    component: MBLogin
  },
  {
    path: '/mine',
    component: MBMine
  }
]

export default routes