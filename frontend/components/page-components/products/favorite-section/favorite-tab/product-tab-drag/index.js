import FavCard from '@/components/page-components/products/favorite-section/favorite-tab/product-tab-drag/fav-card'
import { useEffect, useState, useRef } from 'react'
import { FaMarker } from 'react-icons/fa6'
import myStyle from './drag.module.css'
import { useDragFavorite } from '@/hooks/useDragFavorite'
import { logging } from '@/next.config'
import EmptyFavorite from '../empty-favorite'

export default function ProductTabDrag({ favData }) {
  let favDataRows = favData['rows'] || []

  const { changeDragCard } = useDragFavorite()

  // 三個狀態紀錄section三欄資料
  const [sections, setSections] = useState({
    1: [],
    2: [],
    3: [],
  })

  useEffect(() => {
    let new1 = []
    let new2 = []
    let new3 = []
    favDataRows.map((v, i) => {
      if (v.section === 1) {
        new1.push(v)
      } else if (v.section === 2) {
        new2.push(v)
      } else if (v.section === 3) {
        new3.push(v)
      }
    })
    setSections({ 1: new1, 2: new2, 3: new3 })
  }, [favData])

  const [title, setTitle] = useState(['馬上買', '考慮中', '禮物區'])
  const inpRef1 = useRef(null)
  const inpRef2 = useRef(null)
  const inpRef3 = useRef(null)

  function handleClick(index) {
    const input = document.createElement('input')
    input.type = 'text'
    input.value = title[index]
    input.addEventListener('blur', () => {
      const newTitle = [...title]
      newTitle[index] = input.value
      localStorage.setItem('titles', newTitle)

      setTitle(newTitle)
      if (index === 0) {
        inpRef1.current.innerHTML = input.value
      } else if (index === 1) {
        inpRef2.current.innerHTML = input.value
      } else if (index === 2) {
        inpRef3.current.innerHTML = input.value
      }
    })

    if (index === 0) {
      inpRef1.current.innerHTML = ''
      inpRef1.current.appendChild(input)
    } else if (index === 1) {
      inpRef2.current.innerHTML = ''
      inpRef2.current.appendChild(input)
    } else if (index === 2) {
      inpRef3.current.innerHTML = ''
      inpRef3.current.appendChild(input)
    }
    input.focus()
  }

  useEffect(() => {
    setTitle(localStorage.getItem('titles').split(','))

    // drag JS
    let dragTarget = null
    const pdCard = document.querySelectorAll('.pd-card')
    // console.log('pdCard', pdCard)
    const bgGray = document.querySelectorAll('.bg-gray')
    // console.log('bgGray', bgGray)

    pdCard.forEach((card) => {
      card.addEventListener('dragstart', (e) => {
        dragTarget = e.currentTarget
      })

      card.addEventListener('dragend', (e) => {
        card.classList.add('animate__animated', 'animate__swing')
        dragTarget = null
        setTimeout(() => {
          card.classList.remove('animate__animated', 'animate__swing')
        }, 2000)
      })
    })

    bgGray.forEach((bg) => {
      bg.addEventListener('dragenter', (e) => {
        e.currentTarget.style.backgroundColor = 'rgba(185, 151, 85, 0.5)'
      })
      bg.addEventListener('dragover', (e) => e.preventDefault())
      bg.addEventListener('dragleave', (e) => {
        e.currentTarget.style.backgroundColor = '#f2f2f2'
      })
      bg.addEventListener('drop', (e) => {
        if (dragTarget) {
          //                    放入的區塊         拿起的元素
          handleDragDown(e.currentTarget.id, dragTarget.id)
          // e.currentTarget.append(dragTarget)
          e.currentTarget.style.backgroundColor = '#f2f2f2'
          // 將元素放到另一欄，修改db
          console.log('section, fav_id', e.currentTarget.id, dragTarget.id)
        }
      })
    })

    const titlesDOM = document.querySelectorAll('.title')
    titlesDOM.forEach((v) => {
      v.addEventListener('dblclick', (event) => {
        console.log(event.currentTarget)
      })
    })
  }, [sections])

  const handleDragDown = (section, fav_id) => {
    setSections((prevSections) => {
      // 創建一個新的 sections 對象
      const newSections = { ...prevSections }
      console.log('newSections前', newSections)
      // 找到要移動的項目
      const itemToMove = Object.values(prevSections)
        .flat()
        .find((v) => {
          return v.favorite_id === Number(fav_id)
        })

      if (itemToMove) {
        // 從所有 section 中移除該項目
        Object.keys(newSections).forEach((key) => {
          newSections[key] = newSections[key].filter(
            (v) => v.favorite_id !== Number(fav_id)
          )
        })

        // 將項目添加到目標 section
        newSections[section] = [...newSections[section], itemToMove]
      }
      // 修改後端
      changeDragCard(section, fav_id)

      console.log('newSections後', newSections)
      return newSections
    })
  }

  const handleDragEnd = (e) => {
    console.log('handleDragEnd進')
    e.target.classList.add('animate__animated', 'animate__swing')
    setTimeout(() => {
      e.target.classList.remove('animate__animated', 'animate__swing')
    }, 2000)
  }

  // 無收藏顯示頁面
  if (favDataRows.length === 0) {
    return <EmptyFavorite />
  }

  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-between"></div>

        {/* 卡片區 最外層*/}
        <div className={`${myStyle.grid}`}>
          {/* "d-grid gap-4" */}
          {/* 欄 */}
          <div
            id="1"
            //onDrop={(e) => handleDrop(e, '1')}
            className="text-center bg-gray d-flex align-items-center flex-column"
          >
            <div className={`${myStyle['top-title']} d-flex position-relative`}>
              <h4
                className={myStyle.title}
                // onDoubleClick={() => handleClick(0)}
                ref={inpRef1}
              >
                {title[0]}
              </h4>

              <div className={myStyle.pen}>
                <FaMarker />
              </div>
            </div>
            <div>
              {Array.isArray(sections[1]) &&
                sections[1].map((v, i) => (
                  <FavCard
                    onDragEnd={handleDragEnd}
                    // onDragStart={(e) => handleDragStart(e, v)}
                    key={v.product_id}
                    dbData={v}
                  />
                ))}
            </div>
          </div>

          {/* 欄 */}
          <div
            id="2"
            // onDrop={(e) => handleDrop(e, '2')}
            className="text-center bg-gray d-flex align-items-center flex-column"
          >
            <div className={`${myStyle['top-title']} d-flex position-relative`}>
              <h4
                className={myStyle.title}
                // onDoubleClick={() => handleClick(1)}
                ref={inpRef2}
              >
                {title[1]}
              </h4>
              <div className={myStyle.pen}>
                <FaMarker />
              </div>
            </div>
            {/* 卡片 */}
            {Array.isArray(sections[2]) &&
              sections[2].map((v, i) => (
                <FavCard
                  onDragEnd={handleDragEnd}
                  // onDragStart={(e) => handleDragStart(e, v)}
                  key={v.product_id}
                  dbData={v}
                />
              ))}
          </div>

          {/* 欄 */}
          <div
            id="3"
            // onDrop={(e) => handleDrop(e, '3')}
            className="text-center bg-gray d-flex align-items-center flex-column"
          >
            <div className={`${myStyle['top-title']} d-flex position-relative`}>
              <h4
                className={myStyle.title}
                // onDoubleClick={() => handleClick(2)}
                ref={inpRef3}
              >
                {title[2]}
              </h4>
              <div className={myStyle.pen}>
                <FaMarker />
              </div>
            </div>
            {/* 卡片 */}
            {Array.isArray(sections[3]) &&
              sections[3].map((v, i) => (
                <FavCard
                  onDragEnd={handleDragEnd}
                  // onDragStart={(e) => handleDragStart(e, v)}
                  key={v.product_id}
                  dbData={v}
                />
              ))}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .container {
            background-color: white;
            border-radius: 12px;
            margin-bottom: 30px;
            padding-bottom: 20px;
          }
           {
          }
          .bg-gray {
            background-color: #f2f2f2;
            border-radius: 20px;
            padding: 20px 0;
            height: 100%;
          }
        `}
      </style>
    </div>
  )
}
