import Image from 'next/image'
import lineImg from '@/public/products/line.svg'
import FavCard from '@/components/page-components/products/fav-card'
import { useEffect, useState, useRef } from 'react'

export default function FavouriteSection() {
  // const localTitle = ['測試', '測試', '測試']
  //變更各區名稱
  const [title, setTitle] = useState(['馬上買', '考慮中', '禮物區'])
  const inpRef1 = useRef(null)
  const inpRef2 = useRef(null)
  const inpRef3 = useRef(null)

  function handleClick(index) {
    console.log('handleClick', index)
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
      }
      if (index === 1) {
        inpRef2.current.innerHTML = input.value
      }
      if (index === 2) {
        inpRef3.current.innerHTML = input.value
      }
    })

    if (index === 0) {
      inpRef1.current.innerHTML = ''
      inpRef1.current.appendChild(input)
    }
    if (index === 1) {
      inpRef2.current.innerHTML = ''
      inpRef2.current.appendChild(input)
    }
    if (index === 2) {
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
    const bgGray = document.querySelectorAll('.bg-gray')

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
        e.currentTarget.style.backgroundColor = 'rgba(185, 151, 85, 1)'
      })
      bg.addEventListener('dragover', (e) => e.preventDefault())
      bg.addEventListener('dragleave', (e) => {
        e.currentTarget.style.backgroundColor = '#f2f2f2'
      })
      bg.addEventListener('drop', (e) => {
        if (dragTarget) {
          e.currentTarget.append(dragTarget)
          e.currentTarget.style.backgroundColor = '#f2f2f2'
        }
      })
    })

    const titlesDOM = document.querySelectorAll('.title')
    titlesDOM.forEach((v) => {
      v.addEventListener('dblclick', (event) => {
        console.log(event.currentTarget)
      })
    })
  }, [])
  return (
    <div>
      <div className="container p-4">
        <div className="d-flex justify-content-between">
          <h3>我的收藏</h3>
          <div className="d-flex align-items-end">
            <i className="fa-solid fa-align-left" />
            <i className="fa-solid fa-table-cells-large ms-3" />
          </div>
        </div>

        {/* 線 */}
        <div className="py-4">
          <Image src={lineImg} alt="" />
        </div>

        {/* 卡片區 最外層*/}
        <div className="d-grid gap-4">
          {/* 欄 */}
          <div className="text-center bg-gray d-flex align-items-center flex-column">
            <h4
              className="title"
              onDoubleClick={() => handleClick(0)}
              ref={inpRef1}
            >
              {title[0]}
            </h4>
            <FavCard pdId={1} />
          </div>

          {/* 欄 */}
          <div className="text-center bg-gray d-flex align-items-center flex-column">
            <h4
              className="title"
              onDoubleClick={() => handleClick(1)}
              ref={inpRef2}
            >
              {title[1]}
            </h4>
            {/* 卡片 */}
            <FavCard pdId={2} />
          </div>

          {/* 欄 */}
          <div className="text-center bg-gray d-flex align-items-center flex-column">
            <h4
              className="title"
              onDoubleClick={() => handleClick(2)}
              ref={inpRef3}
            >
              {title[2]}
            </h4>
            {/* 卡片 */}
            <FavCard pdId={3} />
            <FavCard pdId={4} />
            <FavCard pdId={5} />
            <FavCard pdId={6} />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .container {
            max-width: 1040px;
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
          .d-grid {
            grid-template-columns: auto auto auto;
          }
        `}
      </style>
    </div>
  )
}
