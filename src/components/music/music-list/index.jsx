import React, { memo , useState, useEffect} from 'react'
import {
  formatDate,
} from '@/utils/format-utils'

import './index.scss'

export default memo(function Index(props) {
  const { 
    list, 
    changeMusic, 
    musicList , 
    musicIndex  
  } = props
  function chooseMusic(id,i,index) {
    console.log(id)
    setCurrentList(i)
    setCurrentIndex(index)
    changeMusic(id,i,index)
  }

  const [currentList, setCurrentList] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setCurrentList(musicList)
    setCurrentIndex(musicIndex)
  }, [musicList,musicIndex])

  return (
    <div className="music-list-box">
      <div className="music-list">
        <div className="list-title">
          <div>热歌榜单（{list[0].length}）</div>
          <div>新歌榜单（{list[1].length}）</div>
        </div>
        <div className="list-content">
          {
            list.map((v,i) => {
              return (
                <ul key={i}>
                  {
                    v.map((item,index) => {
                      return (
                        <li key={item.id} 
                            onClick={_=>chooseMusic(item.id,i,index)}
                            className={(currentList === i && currentIndex === index) ? 'active' : ''}>
                          <div>{item.name}</div>
                          <div>{item.ar[0].name}</div>
                          <div>{formatDate(item.dt, "mm:ss")}</div>
                        </li>)
                    })
                  }
                </ul>
              )
            })
          }
        </div>
      </div>
    </div>
  )
})