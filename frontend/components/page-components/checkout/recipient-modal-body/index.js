// Recipient Modal Body 選擇收件人彈出視窗
import React, { useState } from 'react'
import styles from './recipient-modal-body.module.css'
import BasicModal from '@/components/UI/basic-modal'
import AddRecipientModalBody from '../add-recipient-modal-body'
import BlackBtn from '@/components/UI/black-btn'
import RecipientButtonEdit from '../../checkout/recipient-button-edit'
import RecipientButton from '../../checkout/recipient-button'
import NoData from '@/components/UI/no-data'

export default function RecipientModalBody({ handleClose }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const openAddModal = () => {
    setIsAddModalOpen(true)
  }

  return (
    <div className={styles.modalBody}>
      <NoData
        text="無收件人資料"
        backgroundColor="#f2f2f2"
        borderRadius="var(--input-radius)"
      />
      <RecipientButtonEdit />
      <RecipientButtonEdit />
      <RecipientButton
        btnText="新增收件人資料"
        iconType="add"
        bgtype="outline"
        onClick={openAddModal}
      />

      <div className={styles.btnStack}>
        <BlackBtn btnText="關閉" onClick={handleClose} href="" paddingType='medium' />
      </div>

      <BasicModal
        modalTitle="新增收件人資料"
        open={isAddModalOpen}
        modalBody={<AddRecipientModalBody handleClose={handleClose} />}
      />
    </div>
  )
}
