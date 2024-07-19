import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

const TextBtn = styled(Button)(({ type }) => ({
  color: 'var(--text-grey)',
  fontFamily: '"Noto Serif JP", serif',
  fontSize: '11.5px',
  minWidth: '2rem',
  padding: '1px 6px',
  backgroundColor: '#f2f2f2',
  '&:hover': {
    color: 'var(--text-dark)',
    backgroundColor: 'var(--pri-3)',
  },
}))

export default function TinyButton({
  btnText,
  type = 'def',
  href = null,
  onClick,
}) {
  return (
    <TextBtn size="medium" type={type} href={href} onClick={onClick}>
      {btnText}
    </TextBtn>
  )
}
