import React, { memo } from 'react';
import { Slider } from 'antd';

import './index.scss'

export default memo(function BlogMusic() {
  return (
    <div className="blog-music sprite_player">
      <div className="content">
        <div className="control">
          <span className="prev sprite_player"></span>
          <span className="play sprite_player"></span>
          <span className="next sprite_player"></span>
        </div>
        <div className="detail">
          <div className="d-image">
            <img src="https://p1.music.126.net/Md3RLH0fe2a_3dMDnfqoQg==/18590542604286213.jpg?param=35x35"/>
          </div>   
          <div className="d-info">
            <div className="song">
              <span>有何不可</span>
              <a>许嵩</a>
            </div>
            <div className="progress">
              <Slider defaultValue={0} />
              <div className="time">
                <span className="now-time">2:20</span>
                <span className="divider">/</span>
                <span className="duration">4:10</span>
              </div>
            </div>
          </div>       
        </div>
        <div className="setting">
          <span className="sprite_player volume"></span>
          <span className="sprite_player icn-loop"></span>
          <span className="sprite_player playlist"></span>
        </div>
      </div>
    </div>
  )
})
