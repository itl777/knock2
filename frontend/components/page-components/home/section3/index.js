import React, { Component } from 'react'
import Slider from 'react-slick'
import Card01 from '@/components/UI/cards'
import { Box } from '@mui/joy'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './section3.module.scss'
import HomeBtn from '@/components/UI/home-btn'

export default function HomeSection3() {
  const data = [
    {
      theme_id: 1,
      branch_name: '台北館',
      theme_img: '/themes-main/themes-3.jpg',
      theme_name: '尋找失落的寶藏',
      difficulty: 'MEDIUM',
      description: '尋找失落寶藏的冒險，需要找到所有隱藏的線索才能成功',
      suitable_players: '2-6',
      theme_time: 60,
    },
    {
      theme_id: 2,
      branch_name: '台北館',
      theme_img: '/themes-main/themes-3.jpg',
      theme_name: '尋找失落的寶藏',
      difficulty: 'EASY',
      description: '尋找失落寶藏的冒險，需要找到所有隱藏的線索才能成功',
      suitable_players: '2-6',
      theme_time: 60,
    },
    {
      theme_id: 3,
      branch_name: '台北館',
      theme_img: '/themes-main/themes-3.jpg',
      theme_name: '尋找失落的寶藏',
      difficulty: 'HARD',
      description: '尋找失落寶藏的冒險，需要找到所有隱藏的線索才能成功',
      suitable_players: '2-6',
      theme_time: 60,
    },
    {
      theme_id: 4,
      branch_name: '台北館',
      theme_img: '/themes-main/themes-3.jpg',
      theme_name: '尋找失落的寶藏',
      difficulty: 'MEDIUM',
      description: '尋找失落寶藏的冒險，需要找到所有隱藏的線索才能成功',
      suitable_players: '2-6',
      theme_time: 60,
    },
    {
      theme_id: 5,
      branch_name: '台北館',
      theme_img: '/themes-main/themes-3.jpg',
      theme_name: '尋找失落的寶藏',
      difficulty: 'MEDIUM',
      description: '尋找失落寶藏的冒險，需要找到所有隱藏的線索才能成功',
      suitable_players: '2-6',
      theme_time: 60,
    },
    {
      theme_id: 6,
      branch_name: '台北館',
      theme_img: '/themes-main/themes-3.jpg',
      theme_name: '尋找失落的寶藏',
      difficulty: 'MEDIUM',
      description: '尋找失落寶藏的冒險，需要找到所有隱藏的線索才能成功',
      suitable_players: '2-6',
      theme_time: 60,
    },
  ]

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
        breakpoint: 1950,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1560,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1173,
        settings: {
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
            {data.map((v) => {
              return (
                <Card01
                  key={v['theme_id']}
                  branchName={v['branch_name']}
                  themeImg={v['theme_img']}
                  themeName={v['theme_name']}
                  difficulty={v['difficulty']}
                  description={v['description']}
                  suitablePlayers={v['suitable_players']}
                  themeTime={v['theme_time']}
                />
              )
            })}
          </Slider>
        </div>

        <div className={styles['HomeBtn']}>
          <HomeBtn linkSrc="/themes" btnText="Check More" fill={false} />
        </div>
      </Box>
    </>
  )
}
