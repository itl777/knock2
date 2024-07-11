import myStyle from './list.module.css'
import FavCardLarge from './fav-card-large'
import useScreenSize from '@/hooks/useScreenSize'
import FavCard from '../product-tab-drag/fav-card'
import { useEffect, useState } from 'react'

export default function ProductTabList({ favData }) {
  let favDataRows = favData['rows'] || []
  const userClientWidth = useScreenSize()
  const [size, setSize] = useState(userClientWidth)

  useEffect(() => {
    setSize(userClientWidth)
  }, [userClientWidth])

  return (
    <div className={myStyle['grid']}>
      {size > 1000
        ? favDataRows.map((r) => {
            return <FavCardLarge key={r.favorite_id} dbData={r} />
          })
        : favDataRows.map((r) => {
            return <FavCard key={r.favorite_id} dbData={r} />
          })}
    </div>
  )
}
