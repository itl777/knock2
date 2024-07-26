import React from 'react'
import myStyle from './message.module.css'

export default function StickerWindow({sendSticker}) {

 
  return (
    <>
      <div className={myStyle.stickerWindow}>
        <div className={myStyle.stickerImgArea}>

          <button onClick={()=>sendSticker(9)}>
            <img
              className={myStyle.stickerImg}
              src="/ghost/ghost_09.png"
              alt=""
            />
          </button>
          <button onClick={()=>sendSticker(2)}>
            <img
              className={myStyle.stickerImg}
              src="/ghost/ghost_02.png"
              alt=""
            />
          </button>
          <button>
            <img
              className={myStyle.stickerImg}
              src="/ghost/ghost_03.png"
              alt=""
            />
          </button>

          <button>
            <img
              className={myStyle.stickerImg}
              src="/ghost/ghost_04.png"
              alt=""
            />
          </button>
          <button>
            <img
              className={myStyle.stickerImg}
              src="/ghost/ghost_05.png"
              alt=""
            />
          </button>
          <button>
            <img
              className={myStyle.stickerImg}
              src="/ghost/ghost_06.png"
              alt=""
            />
          </button>
          <button>
            <img
              className={myStyle.stickerImg}
              src="/ghost/ghost_07.png"
              alt=""
            />
          </button>
          <button>
            <img
              className={myStyle.stickerImg}
              src="/ghost/ghost_07.png"
              alt=""
            />
          </button>
          <button>
            <img
              className={myStyle.stickerImg}
              src="/ghost/ghost_08.png"
              alt=""
            />
          </button>
        </div>
      </div>
    </>
  )
}
