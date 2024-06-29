import React from 'react'
import myStyle from './list.module.css'
import FavCardLarge from './fav-card-large'

export default function ProductTabList(favData) {

  return (
    <div className={myStyle.grid}>
      {favData.map((r) => {
        return <FavCardLarge key={r.favorite_id} dbData={r} />
      })}
    </div>
  )
}
