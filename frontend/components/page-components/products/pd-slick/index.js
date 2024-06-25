import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import myStyle from './slick.module.css'

function PdSlick() {
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={`/pics/tea${i + 1}.jpg`} />
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
    <div className={myStyle['slider-container']}>
      <Slider {...settings}>
        <div>
          <img src="/pics/tea1.jpg" />
        </div>
        <div>
          <img src="/pics/tea2.jpg" />
        </div>
        <div>
          <img src="/pics/tea3.jpg" />
        </div>
        {/* <div>
          <img src="/pics/tea4.jpg" />
        </div> */}
      </Slider>
    </div>
  )
}

export default PdSlick
