import styles from './recipient-button-selected.module.css'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
// contexts
import { useAddress } from '@/context/address-context';
// icons
import { FaPhoneAlt } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosArrowForward } from 'react-icons/io'


const RecipientBtnSelected = styled(Button)(({  }) => ({
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
    backgroundColor: '#fafafa',
    boxShadow: 'none',
  },
}))

export default function RecipientButtonSelected({
  recipientName = '',
  recipientMobile = '',
  address = '',
}) {
  const { openAddressSelectModal } = useAddress();

  return (
    <RecipientBtnSelected onClick={openAddressSelectModal}>
      <div className={styles.infoBox}>
        <p>{recipientName}</p>
        <div className={styles.iconTextRow}>
          <FaPhoneAlt />
          <span>{recipientMobile}</span>
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
