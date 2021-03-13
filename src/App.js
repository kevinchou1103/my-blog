import React, { memo , Suspense } from 'react'

import '@/assets/css/reset.css'
import routes from './router'

import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import FooterMusic from '@/components/music'

export default memo(function App() {
  return (
    <HashRouter>
      <Suspense fallback={<div>page loading</div>}>
        {renderRoutes(routes)}
      </Suspense>
      <FooterMusic/>
    </HashRouter>
  )
})
