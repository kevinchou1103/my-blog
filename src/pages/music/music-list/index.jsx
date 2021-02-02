import React, { memo , useState} from 'react'
import {
  formatDate,
} from '@/utils/format-utils'

import './index.scss'

export default memo(function Index(props) {
  const { list, changeMusic } = props
  function chooseMusic(id) {
    console.log(id)
    setCurrentId(id)
    changeMusic(id)
  }

  const [currentId, setCurrentId] = useState(0)

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
                    v.map(item => {
                      return (
                        <li key={item.id} 
                            onClick={_=>chooseMusic(item.id)}
                            className={currentId === item.id ? 'active' : ''}>
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
