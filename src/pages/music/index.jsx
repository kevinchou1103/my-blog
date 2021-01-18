import React, { memo, useRef, useEffect, useState, useCallback } from 'react';
import { Slider } from 'antd';
import classNames from 'classnames';
import axios from 'axios'

import './index.scss'
import {
  getPlaySong,
  formatDate,
  getSizeImage,
  getSongDetail
} from '@/utils/format-utils'

export default memo(function BlogMusic() {
  const audioRef = useRef()
  const [playing, setPlaying] = useState(false)
  const [audioData, setAudioData] = useState({})
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isChange, setIsChange] = useState(false)
  const [songsId, setSongId] = useState(1349292048)
  
  const imgUrl = (audioData.al && audioData.al.picUrl) || '';
  const singerName = (audioData.ar && audioData.ar[0].name) || '未知'

  useEffect(() => {
    audioRef.current.src = getPlaySong(songsId)
    axios.get(getSongDetail(songsId)).then(res => {
      console.log(res.data.songs[0])
      setAudioData(res.data.songs[0])
    })
  }, [songsId])

  const playMusic = useCallback(() => {
      playing ? audioRef.current.pause() : audioRef.current.play();
      setPlaying(!playing)
    },[playing])
  const updateTime = useCallback((e) => {
    setCurrentTime(e.target.currentTime*1000)
    if(!isChange){
      setProgress(e.target.currentTime*1000*100 / audioData.dt)
    }
  })
  const sliderChange = useCallback((value) => {
    setIsChange(true)
    setCurrentTime(value / 100 * audioData.dt)
    setProgress(value)
  })
  const sliderAfterChange = useCallback((value) => {
    const currentTime = value / 100 * audioData.dt / 1000
    setCurrentTime(currentTime * 1000)
    audioRef.current.currentTime = currentTime
    setIsChange(false)
    if (!playing) {
      playMusic()
    }
  })

  return (
    <div className="blog-music sprite_player">
      <div className="content">
        <div className="control">
          <span className="prev sprite_player"></span>
          <span className={classNames(playing ? 'pause' : 'play',"play sprite_player")} onClick={e => playMusic()}></span>
          <span className="next sprite_player"></span>
        </div>
        <div className="detail">
          <div className="d-image">
            <img src={getSizeImage(imgUrl, 35)}/>
          </div>   
          <div className="d-info">
            <div className="song">
              <span>{audioData.name}</span>
              <a>{singerName}</a>
            </div>
            <div className="progress">
              <Slider value={progress} 
                onChange={sliderChange}
                onAfterChange={sliderAfterChange}/>
              <div className="time">
                <span className="now-time">{formatDate(currentTime, "mm:ss")}</span>
                <span className="divider">/</span>
                <span className="duration">{formatDate(audioData.dt, "mm:ss")}</span>
              </div>
            </div>
          </div>       
        </div>
        <div className="setting">
          <span className="sprite_player volume"></span>
          <span className="sprite_player icn-loop"></span>
          <span className="sprite_player playlist">
            3
          </span>
        </div>
        <audio ref={audioRef} 
          onTimeUpdate={e => updateTime(e)}
          onEnded={e => setPlaying(false)}/>
      </div>
    </div>
  )
})
