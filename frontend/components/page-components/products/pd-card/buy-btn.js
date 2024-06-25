import React from 'react'
import { Button } from '@mui/material'

export default function BuyBtn({ btnText = '直接購買' }) {
  return (
    <>
      <Button
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
    </>
  )
}
