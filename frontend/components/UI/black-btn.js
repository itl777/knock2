import { Button } from '@mui/material'
import Link from 'next/link'

export default function BlackBtn({ btnText = '確認購買', href = '/' }) {
  return (
    <>
      <Link href={href} passHref>
        <Button
          variant="outlined"
          sx={{
            color: 'white',
            fontFamily: 'Noto Serif JP',
            borderRadius: '100px',
            borderColor: '#222',
            marginLeft: '0.625rem',
            background: '#222',
            fontSize: '16px',
            padding: '8px 16px',
            ':hover': {
              color: 'black',
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
