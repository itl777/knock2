// Add Recipient Modal Body 選擇收件人彈出視窗
import { useEffect, useState } from 'react'
import styles from './add-recipient-modal-body.module.css'
import BlackBtn from '@/components/UI/black-btn'
import OrderInputBox from '../order-input-box'
import OrderSelectBox from '../order-select-box'
import { CHECKOUT_ADD_ADDRESS_POST } from '@/configs/api-path'
import useFetchCityDistrict from '@/hooks/fetchCityDistrict'

export default function AddRecipientModalBody({ handleClose, memberId }) {
  const { cityOptions, districtOptions, filteredDistrictOptions } =
    useFetchCityDistrict()

  const [selectedCity, setSelectedCity] = useState()
  const [selectedDistrict, setSelectedDistrict] = useState()

  const [addAddressData, setAddressData] = useState({
    memberId: memberId,
    recipientCityId: 0,
    recipientDistrictId: 0,
    recipientName: '',
    recipientMobile: '',
    recipientAddress: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'recipientCityId') {
      setSelectedCity(value)
      console.log(name, value)
    }

    if (name === 'recipientDistrictId') {
      setSelectedDistrict(value)
      console.log(name, value)
    }

    setAddressData((v) => ({
      ...v,
      [name]: value,
    }))
    console.log(addAddressData)
  }

  useEffect(() => {
    setSelectedDistrict()
    filteredDistrictOptions(selectedCity)
    console.log('after selectedCity, city: ', selectedCity, 'district', districtOptions);
  }, [selectedCity])

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
      <OrderSelectBox
        name="recipientCityId"
        label="縣市"
        placeholder="請選擇"
        value={selectedCity}
        options={cityOptions}
        errorText=""
        onChange={handleInputChange}
      />
      <OrderSelectBox
        name="recipientDistrictId"
        label="鄉鎮區"
        placeholder="請選擇"
        value={selectedDistrict}
        options={districtOptions}
        errorText=""
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
