import React, { memo } from 'react'
import { connect } from 'react-redux'
import { Link , withRouter} from 'react-router-dom'
import { Input, Avatar } from 'antd'

import { user } from '@/store/actions'
import './index.scss'

const Header = memo((props) => {
  const {
    level,
    changeLevel
  } = props
  const { Search } = Input

  const onSearch = (value) => {
    console.log(value)
  }
  const logoutUser = () => {
    document.cookie = "user_level=0"
    changeLevel(0)
    props.history.push('/login')
  }

  return (
    level ? 
    <div className="Header">
      <div className="content">
        <div className="toHome">
          <Link to="/home">
            回到首页
          </Link>
        </div>
        <Search placeholder="input search text" 
          onSearch={onSearch} 
          allowClear
          enterButton
          size="large"
        />
        <div className="user">
          <Avatar size="30">My</Avatar>
          <div onClick={logoutUser}>退出</div>
        </div>
      </div>
    </div> : ''
    )
})

const mapStateToProps = state => ({
  level: state.user.level
})
const mapDispatchToProps = dispatch => ({
  changeLevel: (val) => {
    dispatch(user(val))
  } 
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Header))