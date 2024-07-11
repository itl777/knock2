import styles from './cards.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment-timezone'

import {
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  Typography,
  Box,
} from '@mui/joy'

import { MdOutlineGroup, MdOutlineAccessTime } from 'react-icons/md'
import PdBtnContained from '@/components/UI/pd-btn-contained'

export default function Card01({
  team_id = 0,
  branchName = '',
  themeImg = 'theme-img.png',
  themeName = '',
  difficulty = '',
  suitablePlayers = '',
  team_title = '',
  rick_name = '',
  reservation_date = '',
  start_time = '',
  themeTime = 0,
}) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'EASY':
        return '#63AA90' // 黑色
      case 'MEDIUM':
        return '#B99755' // 白色
      case 'HARD':
        return '#A43131' // 藍色
      default:
        return '#222222' // 默認顏色
    }
  }

  const formatDateToTaiwan = (dateString) => {
    return moment(dateString).tz('Asia/Taipei').format('YYYY年MM月DD日')
  }
  const formatTime = (timeString) => {
    return moment(timeString, 'HH:mm:ss').format('A hh:mm')
  }

  return (
    <Card
      variant="plain"
      sx={{
        '--Card-radius': '0px',
        p: 0,
      }}
      className={styles['card-01']}
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
          py: 3,
          px: { xs: 4, sm: 6 },
          justifyContent: 'center',
          color: '#B99755',
        }}
      >
        <span>團隊名稱：{team_title}</span>
        <span>團長：{rick_name}</span>
        <br />
        <span>
          時間：{formatDateToTaiwan(reservation_date)} {formatTime(start_time)}
        </span>
        <span>長度：{themeTime} 分鐘</span>
      </CardContent>
      <CardOverflow>
        <CardContent
          orientation="horizontal"
          sx={{
            px: 6,
            pb: 2,
            gap: {
              xs: 1,
              sm: 3,
            },
          }}
        >
          <div style={{ margin: '0 auto', paddingTop: '10px ' }}>
            {' '}
            <Link href={`/teams/${team_id}`}>
              <PdBtnContained btnText="查看詳情" color="black" />
            </Link>
          </div>
        </CardContent>
      </CardOverflow>
    </Card>
  )
}
