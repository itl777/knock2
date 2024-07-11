import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import myStyle from './slick.module.css'

function PdSlick() {
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={`/products/tea${i + 1}.jpg`} />
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
        <div className={myStyle['slider-img']}>
          <img src="/products/tea1.jpg" />
        </div>
        <div className={myStyle['slider-img']}>
          <img src="/products/tea2.jpg" />
        </div>
        <div className={myStyle['slider-img']}>
          <img src="/products/tea3.jpg" />
        </div>
      </Slider>
    </div>
  )
}

export default PdSlick
