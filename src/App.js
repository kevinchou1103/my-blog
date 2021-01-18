import React, { memo } from 'react'

import '@/assets/css/reset.css'

import pages from "@/pages";

export default memo(function App() {
  return (
    <div>
      <pages.Home />
      <pages.Mine />
      <pages.Music />
    </div>
  )
})
