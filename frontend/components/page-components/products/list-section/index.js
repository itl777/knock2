import Message from '../message'
import myStyle from './list.module.css'

export default function ListSection({ top, filter, card }) {
  return (
    <div className={myStyle.section}>
      {top}
      {filter}
      {card}
     
        <Message />
  
    </div>
  )
}
