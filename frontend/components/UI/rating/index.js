import * as React from 'react'
import Rating from '@mui/material/Rating'

export default function OrderRating({rate = 0, onChange, readOnly = false }) {
  return (
    <div>
      <Rating 
        name='size-medium' 
        value={rate}
        onChange={(event, newValue) => {
          onChange(newValue)
        }}
        readOnly={readOnly}
      />
    </div>
  )
}
