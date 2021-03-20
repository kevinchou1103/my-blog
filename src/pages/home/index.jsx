import React, { memo, useEffect } from 'react'
import { connect } from 'react-redux'

import { Avatar, Image } from 'antd';
import times_icon from '@/assets/img/read_times.png' 
import './index.scss'

const Home =  memo((props) => {
  const {level} = props

  return (
    <div className="Home">
      <div className="content">
        <ul>
          <li>
            <p className="title">React基础</p>
            <p className="body">
            虚拟DOM:虚拟DOM帮助我们从命令式编程转到了声明式编程的模式，是一种编程理念，UI以一种理想化或者虚拟化的方式保存在内存中，并且它是一个相对简单的JavaScript对象，我们可以通过ReactDOM.render让虚拟DOM和真实DOM同步起来，这个过程中叫做协调树结构：数据结构概念中的一种组织数据的方式
            </p>
            <div className="art-info">
              <div className="user">
                <Avatar
                  src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                />
                徐先生
              </div>
              <div className="time">
                <span>2020-03-19 16:45</span>
                <span><Image width={30} preview={false} src={times_icon} />27次</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="nav">
        <ul>
          <li>JavaScript</li>
          <li>React</li>
          <li>Css</li>
        </ul>
      </div>
    </div>
  )
})

const mapStateToProps = state => ({
  level: state.user.level
})

export default connect(mapStateToProps)(Home)
