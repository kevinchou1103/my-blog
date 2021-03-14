import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

import './index.scss'
import { connect } from 'react-redux'

const NoPage =  memo((props) => {
  const {
    level
  } = props
  return (
    <div className="noPage">
      {
        level ? 
        <Link to="/home">
          <Button>回到首页</Button>
        </Link> : 
        <Link to="/login">
        <Button>登录</Button>
      </Link>
      }
    </div>
  )
})
const mapStateToProps = (state) => ({
  level: state.user.level
})
export default connect(mapStateToProps)(NoPage)
