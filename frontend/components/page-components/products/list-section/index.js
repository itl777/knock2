
import myStyle from './list.module.css'

export default function ListSection({ data, setPage, top, filter, card }) {
  return (
    <div className={myStyle.section}>
      {top}
      {filter}
      {card}
    </div>
  )
}
