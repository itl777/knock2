import { Button } from '@mui/material'

export default function FilterBtn({ btnText = '沒設名字' }) {
  return (
    <>
      <Button
        variant="outlined"
        sx={{
          color: 'black',
          fontFamily: 'Noto Sans TC',
          borderRadius: '100px',
          borderColor: '#222',
          marginLeft: '0.625rem',
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
