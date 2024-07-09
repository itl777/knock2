import { Button } from '@mui/material'
// 改顏色
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/context/theme'

export default function PdBtnContained({ btnText = '沒設定', color = 'grey', onClick}) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color={color}
          onClick={onClick} // ****** Iris Added
          sx={{
            fontFamily: 'Noto Serif JP',
            borderRadius: '16px',
            marginLeft: '0.625rem',
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '2.16px',
            width: '180px',
            padding: '10px 19px',
          }}
        >
          {btnText}
        </Button>
      </ThemeProvider>
    </>
  )
}
