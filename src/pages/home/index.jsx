import React, { memo, useEffect } from 'react'
import { connect } from 'react-redux'

import './index.scss'

const Home =  memo((props) => {
  const {level} = props

  useEffect(() => {
    console.log(level)
  },[level])

  return (
    <div className="home">
      <h1>Home</h1>
    </div>
  )
})

const mapStateToProps = state => ({
  level: state.user.level
})

export default connect(mapStateToProps)(Home)
