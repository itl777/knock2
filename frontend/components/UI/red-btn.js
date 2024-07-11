import { Button } from '@mui/material'

export default function RedBtn({
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
        borderColor: '#A43131',
        background: '#A43131',
        fontSize: '16px',
        padding:
          paddingType === 'medium' ? '8px 32px' : '8px 16px',
        ':hover': {
          color: '#A43131',
          borderColor: '#A43131',
        },
      }}
    >
      {btnText}
    </Button>
  )
}
