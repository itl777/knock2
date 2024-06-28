import styles from './recipient-button-edit.module.css'
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import TextButton from '@/components/UI/text-button'
import EditRecipientModalBody from '../edit-recipient-modal-body'
import BasicModal from '@/components/UI/basic-modal'

import { FaPhoneAlt } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'

const RecipientBtnEdit = styled('div')(({}) => ({
  // gridColumn: 'span 2',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'space-between',
  color: 'var(--text-dark)',
  fontSize: '1.125rem',
  fontFamily: '"Noto Serif JP", serif',
  backgroundColor: 'white',
  border: '2px solid #F2F2F2',
  padding: '0.875rem 1.25rem',
  borderRadius: 'var(--input-radius)',
  boxShadow: 'none',

  '&:hover': {
    backgroundColor: '#fafafa',
    boxShadow: 'none',
  },
}))

export default function RecipientButtonEdit({
  name = '收件人',
  phone = '0900000000',
  address = '天堂市地獄路444號4樓',
  href = '/',
}) {
  
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <RecipientBtnEdit variant="contained" href={href}>
        <div className={styles.header}>
          <p>{name}</p>
          <div className={styles.btnStack}>
            <TextButton btnText="刪除" type="sec" href=''/>

            <div className={styles.btnDivider}> </div>

            <TextButton btnText="編輯" type="sec" onClick={openModal} href='' />

            <div className={styles.btnDivider}> </div>

            <TextButton btnText="使用" type="pri" href=''/>
          </div>
        </div>

        <div className={styles.iconTextRow}>
          <FaPhoneAlt />
          <span>{phone}</span>
        </div>
        <div className={styles.iconTextRow}>
          <FaLocationDot />
          <span>{address}</span>
        </div>
      </RecipientBtnEdit>
      <BasicModal
        modalTitle="編輯收件人資料"
        open={isModalOpen}
        handleClose={closeModal}
        modalBody={
          <EditRecipientModalBody
            handleClose={closeModal}
          />
        }
      />
    </div>
  )
}
