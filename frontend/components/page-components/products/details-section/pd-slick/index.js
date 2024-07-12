import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import myStyle from './slick.module.css'
import { useProductImg } from '@/hooks/useProductImg'
import { useEffect, useState } from 'react'

function PdSlick({ product_id }) {
  const [isId, setIsId] = useState(0)
  const [isData, setIsData] = useState([])

  const { data } = useProductImg(isId)

  useEffect(() => {
    setIsId(product_id)
    if (data) {
      setIsData(data)
      console.log('isData', isData)
    }
  }, [product_id, data])

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={`http://127.0.0.1:3001/images/${i + 1}.jpg`} />
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
        {isData.map((v, i) => {
          return (
            <div key={i} className={myStyle['slider-img']}>
              {/* <img src={`/products/${r}.jpg`} /> */}
              <img src={`http://127.0.0.1:3001/images/${v}.jpg`} />
            </div>
          )
        })}

        {/* <div className={myStyle['slider-img']}>
          <img src="/products/tea2.jpg" />
        </div>
        <div className={myStyle['slider-img']}>
          <img src="/products/tea3.jpg" />
        </div> */}
      </Slider>
    </div>
  )
}

export default PdSlick
