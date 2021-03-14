import React, { memo } from 'react'
import { Form, Input, Button } from 'antd'

import './index.scss'
import { connect } from 'react-redux';
import { user } from '@/store/actions'

const Login = memo((props) => {
  const { changeLevel ,level } = props
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 10, span: 14 },
  };

  const submitInfo = (e) => {
    // console.log(e)
    document.cookie = "user_level=1"
    changeLevel(1)
    props.history.push('/home')
  }

  return (
    <div className="Login">
      <Form
        className="login-form"
        {...layout}
        name='userInfo'
        onFinish={submitInfo}
      >
        <Form.Item
          label="用户名" 
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          {...tailLayout}
          className="login-btn"
        >
          <Button htmlType="submit"
            type="primary"
          >登录</Button>
          <Button>注册</Button>
        </Form.Item>
      </Form>
    </div>
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
export default connect(
  mapStateToProps,mapDispatchToProps
)(Login)