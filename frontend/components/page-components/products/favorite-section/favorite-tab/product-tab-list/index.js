import React, { useEffect, useState } from 'react'
import myStyle from './list.module.css'
import FavCardLarge from './fav-card-large'

export default function ProductTabList({ favData }) {
  let favDataRows = favData['rows'] || []

  return (
    <div className={myStyle['grid']}>
      {favDataRows.map((r) => {
        return <FavCardLarge key={r.favorite_id} dbData={r} />
      })}
    </div>
  )
}
