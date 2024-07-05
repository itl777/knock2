import myStyle from './list.module.css'

export default function ListSection({ top, filter, card }) {
  return (
    <div className={myStyle.section}>
      {top}
      {filter}
      {card}
    </div>
  )
}
