import { Button } from '@mui/material'
// 改顏色
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/context/theme'

export default function PdBtnOutlined({ btnText = '沒設定', onClick }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          onClick={onClick}
          variant="outlined"
          color="favRed"
          sx={{
            // color: '#BA0606',
            fontFamily: 'Noto Serif JP',
            borderRadius: '16px',
            // borderColor: '#BA0606',
            marginLeft: '0.625rem',
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '2.16px',
            width: '180px',
            padding: '10px 19px',
            ':hover': {
              // borderColor: 'rgba(186, 6, 6, 0.70)',
            },
          }}
        >
          {btnText}
        </Button>
      </ThemeProvider>
    </>
  )
}
