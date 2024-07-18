import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './cards.module.scss'
import {
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  Typography,
  Box,
} from '@mui/joy'
import { MdOutlineGroup, MdOutlineAccessTime } from 'react-icons/md'

export default function Card02({
  branchName = '',
  themeImg = 'theme-img.png',
  themeName = '',
  difficulty = '',
  introduction = '',
  min_players = '',
  max_players = '',
  themeTime = 0,
  branch_themes_id,
}) {
  const router = useRouter()

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'EASY':
        return '#63AA90'
      case 'MEDIUM':
        return '#B99755'
      case 'HARD':
        return '#A43131'
      default:
        return '#222222'
    }
  }

  const [clicked, setClicked] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setClicked(!clicked)
    router.push(`/themes/themes-details/${branch_themes_id}`)
  }

  const style = {
    border: '1px solid #222222',
    padding: '7px 13px 7px 13px',
    borderRadius: '20px',
    fontWeight: 'normal',
  }

  return (
    <Card
      variant="plain"
      sx={{
        '--Card-radius': '0px',
        p: 0,
      }}
      className={styles['card-02']}
    >
      {/* 圖片 */}
      <CardOverflow
        sx={{
          position: 'relative',
        }}
      >
        <Typography
          sx={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            color: '#FFFFFF',
            zIndex: 1,
          }}
        >
          {branchName}
        </Typography>
        <AspectRatio ratio="375/240">
          <Image
            src={`/themes-main/${themeImg}`}
            alt=""
            width={375}
            height={240}
          />
        </AspectRatio>
        <Box
          sx={{
            position: 'absolute',
            bottom: '-20px',
            left: '25px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              bgcolor: '#222222',
              color: '#FFFFFF',
              width: 160,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {themeName}
          </Typography>
          <Typography
            sx={{
              bgcolor: getDifficultyColor(difficulty),
              color: '#FFFFFF',
              width: 100,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {difficulty}
          </Typography>
        </Box>
      </CardOverflow>

      {/* 文字 title-md body-sm */}
      <CardContent
        sx={{
          pt: 3,
          pb: 1.5,
          px: { xs: 4, sm: 6 },
          justifyContent: 'center',
        }}
      >
        <span>{introduction}</span>
      </CardContent>
      <CardOverflow>
        <CardContent
          orientation="horizontal"
          sx={{
            px: 6,
            pb: 10,
            gap: {
              xs: 1,
              sm: 3,
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              mr={2}
              startDecorator={<MdOutlineGroup />}
            >{`${min_players}-${max_players} 人`}</Typography>
            <Typography startDecorator={<MdOutlineAccessTime />}>
              {`${themeTime} 分鐘`}
            </Typography>
            <Typography
              sx={{
                display: 'flax',
                alignContent: 'center',
                justifyContent: 'center',
                position: 'absolute',
                right: '22px',
              }}
            >
              <Link
                href="#"
                onClick={handleClick}
                style={style}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#222222'
                  e.target.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = clicked ? '#222222' : 'white'
                  e.target.style.color = clicked ? 'white' : '#222222'
                }}
              >
                立即預訂
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </CardOverflow>
    </Card>
  )
}
