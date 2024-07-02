import { useEffect, useState } from 'react'
import { z } from 'zod'

// context
import { useAuth } from '@/context/auth-context'
import { API_SERVER } from '@/configs/api-path'

// styles
import styles from './user-profile-form.module.scss'

// components
import UserProfileFormTitle from './user-profile-title'
import UserProfileInput from './user-profile-item/UserProfileInput'
import UserProfileRadio from './user-profile-item/UserProfileRadio'
import UserProfileSelect from './user-profile-item/UserProfileSelect'
import UserProfileBirthday from './user-profile-item/birthday'
import AvatarFormItem from './avatar'
import schemaForm from './schemaForm'
import AutohideSnackbar from '@/components/UI/snackbar'

export default function UserProfileForm() {
  // state
  const { auth, getAuthHeader } = useAuth()
  const [profileForm, setProfileForm] = useState({})
  const [addressValue, setAddressValue] = useState({})
  const [addressForm, setAddressForm] = useState([])
  const [birthdayValue, setBirthdayValue] = useState({
    year: '',
    month: '',
    date: '',
  })
  const [birthdayOptions, setBirthdayOptions] = useState({
    years: [],
    months: [],
    dates: [],
  })

  const [profileFormErrors, setProfileFormErrors] = useState({
    name: '',
    nick_name: '',
    gender: '',
    birthday: '',
    mobile_phone: '',
    address: '',
    invoice_carrier_id: '',
    tax_id: '',
  })

  // function
  const handleChange = (e) => {
    const { name, value } = e.target
    // 修改 address
    if (name === 'address_id') {
      setAddressValue({ [name]: value })
      return
    }
    // 修改 birthday
    if (name === 'year' || name === 'month' || name === 'date') {
      const newBirthdayValue = { ...birthdayValue, [name]: value }
      // 寫入 birthday value
      setBirthdayValue(newBirthdayValue)
      const { year, month } = newBirthdayValue
      if (name === 'year' || name === 'month') {
        getBirthdayOptions(year, month)
      }
      return
    }

    // 做表單驗證
    const schemaEmail = z.string().email({ message: '請填寫正確Email格式' })

    if (e.target.name === 'account') {
      const result = schemaEmail.safeParse()
    }

    const newForm = { ...profileForm, [name]: value }
    setProfileForm(newForm)
  }

  const getBirthdayOptions = (defYear, defMonth) => {
    if (
      JSON.stringify(birthdayOptions.years) === '[]' ||
      JSON.stringify(birthdayOptions.months) === '[]'
    ) {
      const today = new Date()
      const year = today.getFullYear()

      const years = Array(100)
        .fill()
        .map((v, i) => {
          return { value: year - i, text: `${year - i} 年` }
        })

      const months = Array(12)
        .fill()
        .map((v, i) => {
          return { value: i + 1, text: `${i + 1} 月` }
        })
      if (defYear && defMonth) {
        const date = new Date(defYear, defMonth, 0).getDate()
        const dates = Array(date)
          .fill()
          .map((v, i) => {
            return { value: i + 1, text: `${i + 1} 日` }
          })
        setBirthdayOptions({ ...birthdayOptions, years, months, dates })
      }
    } else {
      if (defYear && defMonth) {
        const date = new Date(defYear, defMonth, 0).getDate()
        const dates = Array(date)
          .fill()
          .map((v, i) => {
            return { value: i + 1, text: `${i + 1} 日` }
          })
        setBirthdayOptions({ ...birthdayOptions, dates })
      }
    }
  }

  const UserProfileFormSubmit = async (e) => {
    e.preventDefault()

    // 處理 birthdayValue
    const { year, month, date } = birthdayValue
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${date
      .toString()
      .padStart(2, '0')}`
    let data = { ...profileForm, birthday: formattedDate }

    //  處理 addressValue
    if (addressValue.address_id) {
      data = { users: data, address: addressValue }
    } else {
      data = { users: data }
    }

    // 表單驗證

    const result = schemaForm.safeParse(data.users)

    const newProfileFormErrors = {
      name: '',
      nick_name: '',
      birthday: '',
      mobile: '',
      invoice_carrier_id: '',
      tax_id: '',
    }

    if (!result.success) {
      if (result.error?.issues?.length) {
        for (let issue of result.error.issues) {
          newProfileFormErrors[issue.path[0]] = issue.message
        }
        setProfileFormErrors(newProfileFormErrors)
      }
      return // 表單資料沒有驗證通過就直接返回
    }

    // 通過表單驗證 接著 fetch
    const url = `${API_SERVER}/users/api`
    const option = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        ...getAuthHeader(),
        'Content-type': 'application/json',
      },
    }
    try {
      let response = await fetch(url, option)
      let data = await response?.json()
      if (data.success) {
        // 清除 Error 文字
        setProfileFormErrors(newProfileFormErrors)
        // TODO?
      } else {
        console.error(data.error)
      }
    } catch (error) {
      console.error(`fetch-Error: ${error}`)
    }
  }

  const fetchData = async () => {
    const url = `${API_SERVER}/users/api`
    const option = {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
      },
    }
    try {
      let response = await fetch(url, option)
      let data = await response?.json()
      if (data.success) {
        if (data.users) {
          // 寫入 user 表單
          setProfileForm(data.users)
          if (data.users.birthday) {
            // 寫入 birthday value
            const birthday = new Date(data.users.birthday)
            const newBirthday = {
              year: birthday.getFullYear(),
              month: birthday.getMonth() + 1,
              date: birthday.getDate(),
            }
            setBirthdayValue(newBirthday)
            getBirthdayOptions(newBirthday.year, newBirthday.month)
          }
        }
        // 寫入 address options
        if (data.address) {
          const options = data.address.map((v) => {
            return {
              value: v.id,
              type: v.type,
              text: `${v.postal_codes} ${v.city_name}${v.district_name}${v.address} - ${v.recipient_name} / ${v.recipient_phone}`,
            }
          })
          setAddressForm(options)
          // 寫入 address value
          const values = data.address.find((v) => v.type === '1').id
          setAddressValue({ address_id: values })
        }
      } else {
        console.error(data.error)
      }
    } catch (error) {
      console.error(`fetch-Error: ${error}`)
    }
  }

  useEffect(() => {
    if (auth.token) fetchData()
  }, [auth.token])

  // render form
  return (
    <>
      <AutohideSnackbar text="成功訊息" vertical="top" horizontal="center" />
      {JSON.stringify(profileForm) !== '{}' &&
      JSON.stringify(addressForm) !== '[]' ? (
        <form
          className={styles['user-profile-form']}
          onSubmit={UserProfileFormSubmit}
        >
          <div className={styles['box1']}>
            {/* <div className={styles['avatar']}>
            </div> */}
            <AvatarFormItem avatar={profileForm.avatar} />
            <div className={styles['account']}>
              <UserProfileFormTitle text={'帳號資訊'} />
              <UserProfileInput
                label="帳號"
                name="account"
                type="email"
                value={profileForm.account}
                placeholder="請輸入帳號"
                disabled={true}
              />
              <UserProfileInput
                label="密碼"
                name="password"
                type="password"
                value="PasswordPasswordPassword"
                disabled={true}
              />
            </div>
          </div>
          <div className={styles['box2']}>
            <div>
              <UserProfileFormTitle text={'個人資料'} />
              <UserProfileInput
                label="姓名"
                name="name"
                type="text"
                value={profileForm.name}
                placeholder="請輸入姓名"
                disabled={false}
                errorText={profileFormErrors.name}
                onChange={handleChange}
              />
              <UserProfileInput
                label="暱稱"
                name="nick_name"
                type="text"
                value={profileForm.nick_name}
                placeholder="請輸入暱稱"
                errorText={profileFormErrors.nick_name}
                onChange={handleChange}
              />
              <UserProfileRadio
                label="性別"
                radios={[
                  {
                    value: '0',
                    label: '男',
                  },
                  {
                    value: '1',
                    label: '女',
                  },
                ]}
                name="gender"
                disabled={false}
                checked={profileForm.gender}
                errorText={profileFormErrors.gender}
                onChange={handleChange}
              />
              <UserProfileBirthday
                options={birthdayOptions}
                label="生日"
                name="birthday"
                value={birthdayValue}
                errorText=""
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles['box2']}>
            <div>
              <UserProfileFormTitle text={'聯絡資訊'} />
              <UserProfileInput
                label="電話"
                name="mobile_phone"
                type="text"
                value={profileForm.mobile_phone}
                placeholder="請輸入電話"
                errorText={profileFormErrors.mobile_phone}
                onChange={handleChange}
              />
              <UserProfileSelect
                label="常用地址"
                options={addressForm}
                name="address_id"
                value={addressValue.address_id}
                placeholder="請選擇常用地址"
                errorText={profileFormErrors.address_id}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles['box2']}>
            <div>
              <UserProfileFormTitle text={'其他資訊'} />
              <UserProfileInput
                label="常用載具"
                name="invoice_carrier_id"
                type="text"
                value={profileForm.invoice_carrier_id}
                placeholder="請輸入常用載具"
                errorText={profileFormErrors.invoice_carrier_id}
                onChange={handleChange}
              />
              <UserProfileInput
                label="常用統編"
                name="tax_id"
                type="text"
                value={profileForm.tax_id}
                placeholder="請輸入常用統編"
                errorText={profileFormErrors.tax_id}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles['box2']}>
            <button type="submit">送出</button>
          </div>
        </form>
      ) : (
        ''
      )}
    </>
  )
}
