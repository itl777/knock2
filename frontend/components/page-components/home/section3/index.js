import { THEME_LIST } from '@/configs/api-path'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import Card02 from '@/components/UI/cards-themes'
import { Box } from '@mui/joy'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './section3.module.scss'
import HomeBtn from '@/components/UI/home-btn'

// Fisher-Yates 洗牌算法
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function HomeSection3() {
  const [data, setData] = useState({
    success: false,
    themes: [],
  })
  const [selectedBranch, setSelectedBranch] = useState(1) // 默認選擇的第一個分店

  useEffect(() => {
    fetch(`${THEME_LIST}?branch_id=${selectedBranch}`)
      .then((response) => response.json())
      .then((myData) => {
        const shuffledThemes = shuffleArray(myData.themes)
        setData({
          success: true,
          themes: shuffledThemes,
        })
      })
      .catch((error) => {
        console.error('Error fetching themes:', error)
      })
  }, [selectedBranch]) // 添加依賴數組

  const settings = {
    className: 'center',
    centerMode: true,
    slidesToShow: 5,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    focusOnSelect: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 2100,
        settings: {
          centerMode: true,
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1800,
        settings: {
          centerMode: true,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          centerMode: true,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 850,
        settings: {
          centerMode: true,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          centerMode: false,
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <>
      <Box className={styles['home-section3']}>
        <div className={styles['title']}>
          <h1>Game Theme</h1>
        </div>

        <div className="slider-container">
          <Slider {...settings}>
            {data.themes.map((theme) => (
              <Card02
                key={theme.theme_id}
                branchName={theme.branch_name}
                themeImg={theme.theme_img}
                themeName={theme.theme_name}
                difficulty={theme.difficulty}
                introduction={theme.introduction}
                min_players={theme.min_players}
                max_players={theme.max_players}
                themeTime={theme.theme_time}
              />
            ))}
          </Slider>
        </div>

        <div className={styles['HomeBtn']}>
          <HomeBtn
            linkSrc="/themes"
            btnText="Check More"
            hoverColor="#ffffff"
            hoverBorderColor="#222222"
            hoverBackgroundColor="#222222"
          />
        </div>
      </Box>
    </>
  )
}
