// MODAL BODY recipient Modal Body --- 選擇收件人
import React, { useEffect, useState } from 'react'
import styles from './recipient-modal-body.module.css'
import BasicModal from '@/components/UI/basic-modal'
import AddRecipientModalBody from '../add-recipient-modal-body'
import BlackBtn from '@/components/UI/black-btn'
import RecipientButtonEdit from '../../checkout/recipient-button-edit'
import RecipientButton from '../../checkout/recipient-button'
import NoData from '@/components/UI/no-data'
import { CHECKOUT_GET } from '@/configs/api-path'

export default function RecipientModalBody({ handleClose, memberId }) {
  const [memberAddress, setMemberAddress] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const fetchMemberAddress = async () => {
    try {
      const response = await fetch(`${CHECKOUT_GET}?member_id=${memberId}`)

      if (!response.ok) {
        throw new Error('Failed to fetch member address')
      }

      const data = await response.json()

      console.log(data)
      setMemberAddress(data.memberAddresses)
    } catch (error) {
      console.log('Error member address:', error)
    }
  }

  useEffect(() => {
    fetchMemberAddress()
  }, [memberId])

  const openAddModal = () => {
    setIsAddModalOpen(true)
  }

  const handleUpdateAddresses = () => {
    fetchMemberAddress() // 重新加載成員地址列表
  }

  return (
    <div className={styles.modalBody}>
      {memberAddress.length === 0 ? (
        <NoData
          text="無收件人資料"
          backgroundColor="#f2f2f2"
          borderRadius="var(--input-radius)"
        />
      ) : (
        memberAddress.map((v, i) => (
          <RecipientButtonEdit
            key={v.id}
            addressId={v.id}
            name={v.recipient_name}
            phone={v.mobile_phone}
            address={v.address}
            href=""
            memberId={memberId}
            onUpdate={handleUpdateAddresses} // 傳遞更新函數
          />
        ))
      )}

      <RecipientButton
        memberId={memberId}
        btnText="新增收件人資料"
        iconType="add"
        bgtype="outline"
        onClick={openAddModal}
      />

      <div className={styles.btnStack}>
        <BlackBtn
          btnText="關閉"
          onClick={handleClose}
          href=""
          paddingType="medium"
        />
      </div>

      <BasicModal
        modalTitle="新增收件人資料"
        open={isAddModalOpen}
        modalBody={
          <AddRecipientModalBody
            handleClose={handleClose}
            memberId={memberId}
          />
        }
      />
    </div>
  )
}
