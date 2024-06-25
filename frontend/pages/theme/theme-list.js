import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import ThemeBranches from '@/components/UI/theme-branches'
import Card01 from '@/components/UI/cards'
import GoogleMap from '@/components/UI/google-map'

export default function ThemeList() {
  const data = [
    {
      theme_id: 1,
      branch_name: '台北館',
      theme_img: 'themes-3.jpg',
      theme_name: '尋找失落的寶藏',
      difficulty: 'MEDIUM',
      description: '尋找失落寶藏的冒險，需要找到所有隱藏的線索才能成功',
      suitable_players: '2-6',
      theme_time: 60,
    },
    {
      theme_id: 2,
      branch_name: '台北館',
      theme_img: 'themes-3.jpg',
      theme_name: '尋找失落的寶藏',
      difficulty: 'EASY',
      description: '尋找失落寶藏的冒險，需要找到所有隱藏的線索才能成功',
      suitable_players: '2-6',
      theme_time: 60,
    },
    {
      theme_id: 3,
      branch_name: '台北館',
      theme_img: 'themes-3.jpg',
      theme_name: '尋找失落的寶藏',
      difficulty: 'HARD',
      description: '尋找失落寶藏的冒險，需要找到所有隱藏的線索才能成功',
      suitable_players: '2-6',
      theme_time: 60,
    },
    {
      theme_id: 4,
      branch_name: '台北館',
      theme_img: 'themes-3.jpg',
      theme_name: '尋找失落的寶藏',
      difficulty: 'MEDIUM',
      description: '尋找失落寶藏的冒險，需要找到所有隱藏的線索才能成功',
      suitable_players: '2-6',
      theme_time: 60,
    },
    {
      theme_id: 5,
      branch_name: '台北館',
      theme_img: 'themes-3.jpg',
      theme_name: '尋找失落的寶藏',
      difficulty: 'MEDIUM',
      description: '尋找失落寶藏的冒險，需要找到所有隱藏的線索才能成功',
      suitable_players: '2-6',
      theme_time: 60,
    },
    {
      theme_id: 6,
      branch_name: '台北館',
      theme_img: 'themes-3.jpg',
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
      <div className="container">
        {/* 分頁標籤 */}
        <ThemeBranches />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 d-grid d-flex flex-row flex-wrap justify-content-between">
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
          </div>
          <div>
            <GoogleMap />
          </div>
        </div>
      </div>
    </>
  )
}
