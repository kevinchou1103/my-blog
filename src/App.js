import React, { memo , Suspense } from 'react'

import '@/assets/css/reset.css'
import routes from './router'

import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'

import Header from '@/components/header'
import FooterMusic from '@/components/music'
import store from '@/store/store'

export default memo(function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <Header />
        <Suspense fallback={<div>page loading</div>}>
          {renderRoutes(routes)}
        </Suspense>
        <FooterMusic />
      </Provider>
    </HashRouter>
  )
})
