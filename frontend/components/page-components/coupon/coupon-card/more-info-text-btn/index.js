import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import { BorderColor } from '@mui/icons-material'

const TextBtn = styled(Button)(({ type }) => ({
  color: 'white',
  fontFamily: '"Noto Serif JP", serif',
  minWidth: '2rem',
  padding: '0',
  borderRadius: '0',
  borderBottom: '1px solid white',
  '&:hover': {
    color: '#bdbdbd',
    borderBottom: '1px solid #bdbdbd',
  },
}))

export default function MoreInfoBtn({
  btnText,
  type = 'def',
  href = '/',
  onClick,
}) {
  return (
    <TextBtn size="medium" type={type} href={href} onClick={onClick}>
      {btnText}
    </TextBtn>
  )
}
