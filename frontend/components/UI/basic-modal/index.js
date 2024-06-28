// components/UI/basic-modal.jsx
import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import styles from './basic-modal.module.css'
import BlackBtn from '../black-btn'
import RecipientButtonEdit from '@/components/page-components/orders/recipient-button-edit'
import RecipientButton from '@/components/page-components/orders/recipient-button'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '640px',
  height: '640px',
  bgcolor: 'background.paper',
  borderRadius: '1rem',
  boxShadow: ' var(--card-shadow)',
  padding: '1.5rem',
}

export default function BasicModal({
  open,
  handleClose,
  modalTitle = 'Modal Title',
}) {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h5>{modalTitle}</h5>
          <div className={styles.modalBody}>
            <RecipientButtonEdit />
            <RecipientButtonEdit />
            <RecipientButton btnText='新增收件人資料' iconType='add' bgtype='outline'/>
          </div>
          <div className={styles.btnStack}>
            <BlackBtn btnText="關閉" />
          </div>
        </Box>
      </Modal>
    </div>
  )
}
