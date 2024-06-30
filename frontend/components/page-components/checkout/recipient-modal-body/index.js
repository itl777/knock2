// MODAL BODY recipient Modal Body --- 選擇收件人
import React, { useEffect, useState } from 'react'
import styles from './recipient-modal-body.module.css'
import BasicModal from '@/components/UI/basic-modal'
import AddRecipientModalBody from '../add-recipient-modal-body'
import BlackBtn from '@/components/UI/black-btn'
import RecipientButtonEdit from '../../checkout/recipient-button-edit'
import RecipientButton from '../../checkout/recipient-button'
import NoData from '@/components/UI/no-data'

export default function RecipientModalBody({
  handleClose,
  memberId,
  memberAddress,
  fetchMemberAddress,
  onSelectedAddress,
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState([])

  const handleAddressSelected = (address) => {
    setSelectedAddress(address)
    onSelectedAddress(address) // 傳遞選中的地址給父層
    console.log('modal body receive selected address array: ', address)
  }

  const openAddModal = () => {
    setIsAddModalOpen(true)
  }

  const handleUpdateAddresses = () => {
    fetchMemberAddress() // 重新加載成員地址列表
  }

  const closeRecipientModal = () => {
    handleClose();
  };

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
            href={null}
            memberId={memberId}
            updateFetch={handleUpdateAddresses} // 傳遞更新函數(刪除後刷新 modal)
            memberAddress={memberAddress}
            updateSelectedAddress={handleAddressSelected}
            closeRecipientModal={closeRecipientModal} // 傳遞關閉 modal 的函數
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
