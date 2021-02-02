import React, { memo, useRef, useEffect, useState, useCallback } from 'react';
import { Slider } from 'antd';
import classNames from 'classnames';
import MusicRequest from "@/components/musicRequest";

import './index.scss'
import {
  getPlaySong,
  formatDate,
  getSizeImage
} from '@/utils/format-utils'

import MusicList from "./music-list";

export default memo(function BlogMusic() {
  const audioRef = useRef()
  const [playing, setPlaying] = useState(false)
  const [audioData, setAudioData] = useState({})
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isChange, setIsChange] = useState(false)
  const [songsId, setSongId] = useState(1349292048)
  const [showList, setShowList] = useState(true)
  const [list1, setList1] = useState([])
  const [list2, setList2] = useState([])
  
  const imgUrl = (audioData.al && audioData.al.picUrl) || '';
  const singerName = (audioData.ar && audioData.ar[0].name) || '未知'

  useEffect(() => {
    // 热歌榜单
    MusicRequest({
      // url: `/playlist/detail/dynamic`,
      // data: {
      //   id:3778678
      // }
      url: '/top/list',
      data: {
        idx: 1
      }
    }).then(res => {
      setList1(res.playlist.tracks)
    })
    // 新歌榜
    MusicRequest({
      // url: `/playlist/detail/dynamic`,
      // data: {
      //   id:3779629
      // }
      url: '/top/list',
      data: {
        idx: 0
      }
    }).then(res => {
      setList2(res.playlist.tracks)
    })
  },[])

  useEffect(() => {
    audioRef.current.src = getPlaySong(songsId)
    MusicRequest({
      url: `/song/detail`,
      data: {
        ids: songsId
      }
    }).then(res => {
      // console.log(res.songs[0])
      setAudioData(res.songs[0])
      playMusic()
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
  const changeMusic = useCallback((value) => {
    setPlaying(false)
    setSongId(value)
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
          <span className="sprite_player playlist" onClick={_ => setShowList(!showList)}>
            {list1.length + list2.length}
          </span>
        </div>
        <audio ref={audioRef} 
          onTimeUpdate={e => updateTime(e)}
          onEnded={e => setPlaying(false)}/>
      </div>
      {
        showList ? 
        <MusicList 
          list = {[list1,list2]}
          changeMusic = {changeMusic}
        />: ''
      }
    </div>
  )
})
