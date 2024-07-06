// Add Recipient Modal Body 選擇收件人彈出視窗
import { useState } from 'react'
import styles from './add-recipient-modal-body.module.css'
import BlackBtn from '@/components/UI/black-btn'
import OrderInputBox from '../order-input-box'
import { CHECKOUT_ADD_ADDRESS_POST } from '@/configs/api-path'

export default function AddRecipientModalBody({ handleClose, memberId }) {
  const [addAddressData, setAddressData] = useState({
    memberId: memberId,
    recipientCityId: 1,
    recipientDistrictId: 1,
    recipientName: '',
    recipientMobile: '',
    recipientAddress: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    console.log(addAddressData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(CHECKOUT_ADD_ADDRESS_POST, {
        method: 'POST',
        body: JSON.stringify(addAddressData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      console.log(data)

      if (data.success) {
        // 關閉頁面
        handleClose()
      }
    } catch (error) {
      console.error('提交表單時出錯', error)
    }
  }

  return (
    <form
      name="addAddressForm"
      onSubmit={handleSubmit}
      className={styles.modalBody}
    >
      <OrderInputBox
        label="姓名"
        name="recipientName"
        value={addAddressData.recipientName}
        onChange={handleInputChange}
      />
      <OrderInputBox
        label="手機"
        name="recipientMobile"
        value={addAddressData.recipientMobile}
        onChange={handleInputChange}
      />
      <OrderInputBox
        label="縣市"
        name="recipientCityId"
        value={addAddressData.recipientCityId}
        onChange={handleInputChange}
      />
      <OrderInputBox
        label="鄉鎮區"
        name="recipientDistrict"
        value={addAddressData.recipientDistrictId}
        onChange={handleInputChange}
      />
      <OrderInputBox
        label="地址"
        name="recipientAddress"
        value={addAddressData.recipientAddress}
        onChange={handleInputChange}
      />

      <div className={styles.btnStack}>
        <BlackBtn
          btnText="取消"
          onClick={handleClose}
          href={null}
          paddingType="medium"
        />
        <BlackBtn
          btnText="儲存"
          type="submit"
          // onClick={handleClose}
          href={null}
          paddingType="medium"
        />
      </div>
    </form>
  )
}
