import { Button } from '@mui/material'


export default function BlackBtn({
  btnText = 'button',
  type = 'button',
  href = '/',
  onClick = () => {},
  paddingType = '',
  className,
}) {
  return (
    <Button
      type={type}
      href={href}
      variant="outlined"
      onClick={onClick}
      className={className}
      sx={{
        color: 'white',
        fontFamily: 'Noto Serif JP',
        borderRadius: '100px',
        borderColor: '#222',
        background: '#222',
        fontSize: '16px',
        padding:
          paddingType === 'medium' ? '8px 32px' : '8px 16px',
        ':hover': {
          color: 'black',
          borderColor: '#222',
        },
      }}
    >
      {btnText}
    </Button>
  )
}
