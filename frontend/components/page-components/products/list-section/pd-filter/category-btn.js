import Link from 'next/link'
import myStyle from './filter.module.css'

export default function CategoryBtn() {
  return (
    <>
      <div className="row">
        <div className="col-6 offset-3">
          <ul id="category-ul" className="d-flex">
            <li className={myStyle['li-line']}>
              <Link href="?category_id=1">派對遊戲</Link>
            </li>
            <li className={myStyle['li-line']}>
              <Link href="?category_id=2">陣營遊戲</Link>
            </li>
            <li className={myStyle['li-line']}>
              <Link href="?category_id=3">策略遊戲</Link>
            </li>
            <li className={myStyle['li-line']}>
              <Link href="?category_id=4">兒童遊戲</Link>
            </li>
            <li className={myStyle['li-line']}>
              <Link href="?category_id=5">家庭遊戲</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
