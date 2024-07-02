// COMPONENT Recipient button edit
import styles from './recipient-button-edit.module.css'
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { CHECKOUT_DELETE_ADDRESS } from '@/configs/api-path'
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
  name = '無收件人',
  phone = '無收件手機',
  address = '無收件地址',
  href = '/',
  updateFetch, // 更新成員地址列表的函數
  addressId, // 接收父層資料
  memberId, // 接收父層資料
  memberAddress, // 接收父層資料
  updateSelectedAddress, // 傳至父層
  closeRecipientModal, // 點擊使用自動關閉 modal
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const openEditModal = () => {
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
  }

  const selectAddress = () => {
    const updatedSelectedAddresses = memberAddress.map((v) => ({
      ...v,
      selected: v.id === addressId, // 選中的 addressId = true, 其餘為 false
    }))
    updateSelectedAddress(updatedSelectedAddresses)
    console.log(
      'update selected selected address from use button',
      addressId,
      updatedSelectedAddresses
    )

    if (closeRecipientModal) {
      closeRecipientModal();
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`${CHECKOUT_DELETE_ADDRESS}/${addressId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      if (data.success) {
        updateFetch() // 成功刪除後，執行 updateFetch 來更新成員地址列表
        console.log(`delete address is: ${addressId}`)
      } else {
        console.error('地址刪除失敗', data)
      }
    } catch (error) {
      console.error('刪除地址時出錯', error)
    }
  }

  return (
    <div>
      <RecipientBtnEdit variant="contained" href={href}>
        <div className={styles.header}>
          <p>{name}</p>
          <div className={styles.btnStack}>
            <TextButton
              btnText="刪除"
              type="sec"
              onClick={handleDelete}
              href={null}
            />

            <div className={styles.btnDivider}> </div>

            <TextButton
              btnText="編輯"
              type="sec"
              onClick={openEditModal}
              href={null}
            />

            <div className={styles.btnDivider}> </div>

            <TextButton
              btnText="使用"
              type="pri"
              onClick={selectAddress}
              href={null}
            />
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
        open={isEditModalOpen}
        handleClose={closeEditModal}
        modalBody={<EditRecipientModalBody handleClose={closeEditModal} />}
      />
    </div>
  )
}
