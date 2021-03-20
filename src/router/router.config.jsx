import React from 'react'
import { Redirect } from 'react-router-dom'

const MBHome = React.lazy(_ => import('@/pages/home'));
const MBMine = React.lazy(_ => import('@/pages/mine'));
const MBLogin = React.lazy(_ => import('@/pages/login'));
const MBNoPage = React.lazy(_ => import('@/pages/noPage'));

const routes = [
  {
    path: '/',
    exact: true,
    render: () => (<Redirect to="home"/>)
  },
  {
    path: '/login',
    exact: true,
    render: () => (<Redirect to="home"/>)
  },
  {
    path: '/home',
    component: MBHome
  },
  {
    path: '/mine',
    component: MBMine
  },
  {
    path: '/404',
    component: MBNoPage
  },
  {
    path: '/',
    render: () => (<Redirect to="/404"/>)
  },
]

export default routes