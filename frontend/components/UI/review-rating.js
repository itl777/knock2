import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import { useState } from 'react'

export default function ReviewRating({ productRating=4 }) {
  const value = productRating || 0

  return (
    <>
      <Rating
        name="size-large"
        size="large"
        value={value}
        readOnly
        precision={1}
        emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
      />
    </>
  )
}
