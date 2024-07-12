import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import myStyle from './slick.module.css'
import { useProductImg } from '@/hooks/useProductImg'
import { useEffect, useState } from 'react'

function PdSlick({ product_id }) {
  const [isId, setIsId] = useState(0)
  // const [isData, setIsData] = useState([])

  const { data } = useProductImg(isId)
  console.log('13-data', data)
  useEffect(() => {
    setIsId(product_id)
  }, [product_id])

  // useEffect(() => {
  //   if (data) {
  //     setIsData(data)
  //     console.log('isData', isData)
  //   }
  // }, [data])

  console.log('25-data', data)
  // console.log('25-isData', isData)

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={`http://127.0.0.1:3001/images/${data[i]}.png`} />
        </a>
      )
    },
    dots: true,
    dotsClass: `slick-dots ${myStyle['slick-thumb']}`,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }
  return (
    <div>
      <Slider {...settings}>
        {data.map((v, i) => {
          return (
            <div key={i} className={myStyle['slider-img']}>
              <img src={`http://127.0.0.1:3001/images/${v}.png`} />
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default PdSlick