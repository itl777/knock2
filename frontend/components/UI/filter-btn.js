import { Button } from '@mui/material'
import Link from 'next/link'

export default function FilterBtn({ btnText = '沒設名字', href = '/' }) {
  return (
    <>
      <Link href={href} passHref>
        <Button
          variant="outlined"
          sx={{
            color: 'black',
            fontFamily: 'Noto Sans TC',
            borderRadius: '100px',
            borderColor: '#222',
            ':hover': {
              borderColor: '#222',
            },
          }}
        >
          {btnText}
        </Button>
      </Link>
    </>
  )
}
