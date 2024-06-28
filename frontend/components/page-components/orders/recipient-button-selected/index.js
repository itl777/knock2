import styles from './recipient-button-selected.module.css'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosArrowForward } from 'react-icons/io'


const RecipientBtnSelected = styled(Button)(({ theme }) => ({
  gridColumn: 'span 2',
  display: 'flex',
  justifyContent: 'space-between',
  color: 'var(--text-dark)',
  fontSize: '1.125rem',
  fontFamily: '"Noto Serif JP", serif',
  backgroundColor: '#F2F2F2',
  padding: '0.875rem 1.25rem',
  borderRadius: 'var(--input-radius)',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#eaeaea',
    boxShadow: 'none',
  },
}))

export default function RecipientButtonSelected({
  name = '收件人',
  phone = '0900000000',
  address = '天堂市地獄路444號4樓',
  href = '/'
}) {
  return (
    <RecipientBtnSelected variant="contained" href={href}>
      <div className={styles.infoBox}>
        <p>{name}</p>
        <div className={styles.iconTextRow}>
          <FaPhoneAlt />
          <span>{phone}</span>
        </div>
        <div className={styles.iconTextRow}>
          <FaLocationDot />
          <span>{address}</span>
        </div>
      </div>
      <IoIosArrowForward />
    </RecipientBtnSelected>
  )
}
