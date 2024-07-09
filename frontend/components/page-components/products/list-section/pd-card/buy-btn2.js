import React from 'react'
import { Button } from '@mui/material'

export default function BuyBtn2({ btnText = '加入購物車', onClick }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        fontFamily: 'Noto Sans TC',
        color: 'black',
        width: '100%',
        '&:hover': {
          color: 'gray',
        },
      }}
    >
      {btnText}
    </Button>
  )
}
