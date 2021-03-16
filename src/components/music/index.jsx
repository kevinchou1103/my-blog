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
import { connect } from 'react-redux';

let showLoopTextTimer = null // 循环提示文字延时关闭

const BlogMusic = memo((props) => {
  const { level } = props

  const audioRef = useRef()
  const [playing, setPlaying] = useState(false)
  const [audioData, setAudioData] = useState({}) // 获取到的音乐信息
  const [currentTime, setCurrentTime] = useState(0) // 当前音乐已播放时长
  const [progress, setProgress] = useState(0) // 音乐进度条
  const [isChange, setIsChange] = useState(false) // 音乐进度条是否在改变中
  const [songsId, setSongId] = useState(0) // 当前音乐ID
  const [showList, setShowList] = useState(false)
  const [list1, setList1] = useState([])
  const [list2, setList2] = useState([])
  const [currentList, setCurrentList] = useState(0) // 当前音乐列表
  const [currentIndex, setCurrentIndex] = useState(0) // 当前音乐列表歌曲
  const [loopType, setLoopType] = useState(2)  // 音乐循环 0列表循环 1单曲循环 2随机循环
  const [showLoopText, setShowLoopText] = useState(false)
  const [volumeValue, setVolumeValue] = useState(100) // 当前音乐音量
  const [showVolumeProcess, setShowVolumeProcess] = useState(false)

  const imgUrl = (audioData.al && audioData.al.picUrl) || '';
  const singerName = (audioData.ar && audioData.ar[0].name) || '未知'

  useEffect(() => {
    if (!level) return
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
      setSongId(res.playlist.tracks[0].id)
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
  },[level])

  useEffect(() => {
    if(list1.length) {
      audioRef.current.src = getPlaySong(songsId)
      MusicRequest({
        url: `/song/detail`,
        data: {
          ids: songsId
        }
      }).then(res => {
        // console.log(res.songs[0])
        setAudioData(res.songs[0])
        if(level) playMusic()
      })
    }
  }, [songsId])

  useEffect(() => {
    if(list1.length) {
      setShowLoopText(true)
      if (showLoopTextTimer != null) {
        clearTimeout(showLoopTextTimer)
      }
      showLoopTextTimer = setTimeout(() => {
        setShowLoopText(false)
      }, 2000)
    }
  },[loopType])

  const playMusic = () => {
    playing ? audioRef.current.pause() : audioRef.current.play();
    setPlaying(!playing)
  }

  const updateTime = (e) => {
    setCurrentTime(e.target.currentTime*1000)
    if(!isChange){
      setProgress(e.target.currentTime*1000*100 / audioData.dt)
    }
  }
  const sliderChange = (value) => {
    setIsChange(true)
    setCurrentTime(value / 100 * audioData.dt)
    setProgress(value)
  }

  const sliderAfterChange = (value) => {
    const currentTime = value / 100 * audioData.dt / 1000
    setCurrentTime(currentTime * 1000)
    audioRef.current.currentTime = currentTime
    setIsChange(false)
    if (!playing) {
      playMusic()
    }
  }
  const endPlaying = () => {
    if(loopType === 1) {
      audioRef.current.play();
      setPlaying(true)
    } else {
      playPreMusic('next')
    }
  }
  const changeMusic = useCallback((value,list,index) => {
    if(value !== songsId) {
      setPlaying(false)
      setSongId(value)
    }
    setCurrentList(list)
    setCurrentIndex(index)
  },[songsId])
  const playPreMusic = (type) => {
    let list = currentList === 0 ? list1 : list2
    let index = 0
    let len = list.length - 1
    if(loopType === 2) {
      let num = parseInt(Math.random() * len) + 1
      index = num === currentIndex ? len : num
    } else {
      switch (type) {
        case 'pre':
          index = currentIndex === 0 ? len : currentIndex - 1
          break;
        case 'next':
          index = currentIndex === len ? 0 : currentIndex + 1
          break;
        default :
          index = currentIndex
      }
    }
    setPlaying(false)
    setCurrentIndex(index)
    setSongId(list[index].id)
  }
  const volumeChange = (value) => {
    setVolumeValue(value)
    audioRef.current.volume = value / 100;
  }

  return (
      <>
      {
        level ? 
        <div className={classNames("blog-music","sprite_player")}>
          <div className="content">
            <div className="control">
              <span className="prev sprite_player" onClick={e => playPreMusic('pre')}></span>
              <span className={classNames(playing ? 'pause' : 'play',"play sprite_player")} onClick={e => playMusic()}></span>
              <span className="next sprite_player" onClick={e => playPreMusic('next')}></span>
            </div>
            <div className="detail">
              <div className="d-image">
                <img src={getSizeImage(imgUrl, 35)} onClick={_ => setShowList(!showList)}/>
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
              <span className="sprite_player volume" onClick = {_ => setShowVolumeProcess(!showVolumeProcess)}></span>
              <span className={classNames(loopType === 0 ? "icn-loop" : loopType === 1 ? "icn-one" : "icn-shuffle"
                ,"sprite_player")} onClick={e => setLoopType(_ => loopType === 2 ? 0 : loopType + 1)}></span>
              <span className="sprite_player playlist" onClick={_ => setShowList(!showList)}>
                {list1.length + list2.length}
              </span>
              {
                showLoopText ? <div className="loop_text">{loopType === 0 ? "循环播放" : loopType === 1 ? "单曲循环" : "随机播放"}</div> : ''
              }
              {
                showVolumeProcess ? 
                <div className="volumeProcess">
                  <Slider value={volumeValue} 
                    onChange={volumeChange}
                    vertical
                    tooltipVisible/>
                </div> : ''
              }
              
            </div>
            <audio ref={audioRef} 
              onTimeUpdate={e => updateTime(e)}
              onEnded={e => endPlaying()}/>
          </div>
          {
            showList ? 
            <MusicList 
              list = {[list1,list2]}
              changeMusic = {changeMusic}
              musicList = {currentList}
              musicIndex = {currentIndex}
            />: ''
          }
        </div>
        :''
      }
      
      </>
    )
})

const mapStateToProps = state => ({
  level: state.user.level
})
export default connect(mapStateToProps)(BlogMusic)