import styles from './add-address-modal.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
// context
import { useAuth } from '@/context/auth-context'
import { useAddress } from '@/context/address-context'
// hooks
import useFetchCityDistrict from '@/hooks/fetchCityDistrict'
// components
import ModalLayout from '../modal-layout'
import OrderInputBox from '../../order-input-box'
import OrderSelectBox from '../../order-select-box'

export default function AddAddressModal() {
  const { auth } = useAuth()
  const {
    isAddressAddModalOpen,
    closeAddressAddModal,
    handleAddAddressSubmit,
  } = useAddress()

  // 縣市地區選項，以及地區根據選擇的縣市連動
  const { cityOptions, districtOptions, filteredDistrictOptions } =
    useFetchCityDistrict()

  const [selectedCity, setSelectedCity] = useState()
  const [selectedDistrict, setSelectedDistrict] = useState()

  // 縣市地區選項，以及
  const [addAddressData, setAddressData] = useState({
    memberId: auth.id,
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
    console.log(
      'after selectedCity, city: ',
      selectedCity,
      'district',
      districtOptions
    )
  }, [selectedCity])

  return (
    <ModalLayout
      title="新增收件人資料"
      btnTextLeft="取消"
      btnTextRight="確定新增"
      onClickLeft={closeAddressAddModal}
      onClickRight={() => {
        handleAddAddressSubmit(addAddressData)
      }}
      isOpen={isAddressAddModalOpen}
    >
      <form name="addAddressForm" className={styles.formBox}>
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
          label="地區"
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
      </form>
    </ModalLayout>
  )
}

/*
  const handleAddAddressSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(CHECKOUT_ADD_ADDRESS, addAddressData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log(response.data)

      if (response.data.success && !!response.data.addressId) {
        fetchMemberAddress()
        setNewAddressId(response.data.addressId)
        closeAddressAddModal()
        closeAddressSelectModal()
      } else {
        alert('新增失敗！')
      }

      console.log('new added id', response.data.addressId)
    } catch (error) {
      console.error('新增地址錯誤', error)
    }
  }
*/
