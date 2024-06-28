import Link from 'next/link'
import myStyle from './filter.module.css'

export default function CategoryBtn() {
  return (
    <>
      <div className="row">
        <div className="col-6 offset-3">
          <ul id="category-ul" className="d-flex">
            <li className={myStyle['li-line']}>
              <Link href="#">派對遊戲</Link>
            </li>
            <li className={myStyle['li-line']}>
              <Link href="#">益智遊戲</Link>
            </li>
            <li className={myStyle['li-line']}>
              <Link href="#">兒童遊戲</Link>
            </li>
            <li className={myStyle['li-line']}>
              <Link href="#">家庭遊戲</Link>
            </li>
            <li className={myStyle['li-line']}>
              <Link href="#">猜謎遊戲</Link>
            </li>
          </ul>
        </div>
      </div>

    
    </>
  )
}
