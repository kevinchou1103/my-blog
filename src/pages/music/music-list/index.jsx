import React, { memo } from 'react'

import './index.scss'

export default memo(function index() {
  return (
    <div className="music-list-box">
      <div className="music-list">
        <div className="list-title">
          播放列表（5）
        </div>
        <div className="list-content">
          <ul>
            <li className="active">
              <div>星辰大海</div>
              <div>黄霄雲</div>
              <div>03:27</div>
            </li>
            <li>有何不可</li>
            <li>后来</li>
          </ul>
          <div className="line"></div>
          <ul>
            <li className="active">星辰大海</li>
            <li>有何不可</li>
            <li>后来</li>
          </ul>
        </div>
      </div>
    </div>
  )
})
