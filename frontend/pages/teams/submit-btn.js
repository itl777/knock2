import { Button } from '@mui/material'
// 改顏色
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/context/theme'

export default function SubmitBtn({
  btnText = '沒設定',
  color = 'grey',
  onClick,
  disableSubmit,
}) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color={color}
          type="submit"
          onClick={onClick} // ****** Iris Added
          disableSubmit={disableSubmit}
          sx={{
            fontFamily: 'Noto Serif JP',
            borderRadius: '16px',
            marginLeft: '0.625rem',
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '2.16px',
            width: '180px',
            padding: '10px 19px',
            // backgroundColor: disabled ? 'red' : theme.palette[color].main,
            // color: disabled ? '#FFF' : '#000',
            '&:hover': {
              // backgroundColor: disabled ? '#B0B0B0' : theme.palette[color].dark,
            },
            cursor: disableSubmit ? 'not-allowed' : 'pointer',
            opacity: disableSubmit ? 0.5 : 1,
          }}
        >
          {btnText}
        </Button>
      </ThemeProvider>
    </>
  )
}
