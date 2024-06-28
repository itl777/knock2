import { Button } from '@mui/material'

export default function FilterBtn({
  btnText = '沒設名字',
  href = '/',
  margin = '0',
}) {
  return (
    <>
      <Button
        href={href}
        variant="outlined"
        sx={{
          color: 'black',
          fontFamily: 'Noto Sans TC',
          borderRadius: '100px',
          margin: margin,
          borderColor: '#222',
          ':hover': {
            borderColor: '#222',
          },
        }}
      >
        {btnText}
      </Button>
    </>
  )
}
