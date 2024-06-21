import { Button } from '@mui/material'
import Link from 'next/link'

export default function HomeBtn({
  linkSrc = '',
  btnText = '請輸入按鈕文字',
  color = '#7B7B7B',
  borderColor = '#7B7B7B',
  backgroundColor = 'unset',
  hoverColor = '#7B7B7B',
  hoverBorderColor = '#D9D9D9',
  hoverBackgroundColor = '#D9D9D9',
}) {
  return (
    <>
      <Link href={linkSrc}>
        <Button
          variant="outlined"
          size="large"
          sx={{
            color: color,
            fontFamily: 'Noto Serif JP',
            fontSize: '20px',
            lineHeight: 2.5,
            borderRadius: '100px',
            borderColor: borderColor,
            backgroundColor: backgroundColor,
            textTransform: 'none',
            ':hover': {
              color: hoverColor,
              borderColor: hoverBorderColor,
              backgroundColor: hoverBackgroundColor,
            },
          }}
        >
          <span style={{ padding: '0 20px' }}>{btnText}</span>
        </Button>
      </Link>
    </>
  )
}
