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

export default function UserProfileForm() {
  const { auth, getAuthHeader } = useAuth()
  const [profileForm, setProfileForm] = useState({})
  const [addressForm, setAddressForm] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target

    // 做表單驗證
    const schemaEmail = z.string().email({ message: '請填寫正確Email格式' })

    if (e.target.name === 'account') {
      const result = schemaEmail.safeParse()
    }

    const newForm = { ...profileForm, [name]: value }
    setProfileForm(newForm)
  }

  const getAddressDefaultValue = (options) => {
    if (Array.isArray(options)) {
      const item = options.find((v) => v.type === '1')
      return item?.value
    }
  }
  const onSelectChange = (event) => {
    console.log(event)
    setProfileForm({ ...profileForm, [event.name]: event.value })
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
        setProfileForm(data.users)
        const options = data.address.map((v) => {
          return {
            value: v.id,
            type: v.type,
            text: `${v.district_id} ${v.city_name}${v.district_name}${v.address} - ${v.recipient_name} / ${v.recipient_phone}`,
          }
        })
        setAddressForm(options)
      } else {
        console.error(data.error)
      }
    } catch (error) {
      console.error(`fetch-Error: ${error}`)
    }
  }

  useEffect(() => {
    if (auth.token) fetchData()
  }, [auth])

  return (
    <>
      {JSON.stringify(profileForm) !== '{}' &&
      JSON.stringify(addressForm) !== '[]' ? (
        <form className={styles['user-profile-form']}>
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
                errorText=""
                onChange={handleChange}
              />
              <UserProfileInput
                label="暱稱"
                name="nick_name"
                type="text"
                value={profileForm.nick_name}
                placeholder="請輸入暱稱"
                errorText=""
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
                errorText=""
                onChange={handleChange}
              />
              <UserProfileBirthday
                label="生日"
                name="birthday"
                defaultValue={profileForm.birthday}
                errorText=""
                onChange={onSelectChange}
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
                errorText=""
                onChange={handleChange}
              />
              <UserProfileSelect
                label="常用地址"
                options={addressForm}
                name="address"
                defaultValue={getAddressDefaultValue(addressForm)}
                placeholder="請選擇常用地址"
                errorText=""
                onChange={onSelectChange}
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
                errorText=""
                onChange={handleChange}
              />
              <UserProfileInput
                label="常用統編"
                name="tax_id"
                type="text"
                value={profileForm.tax_id}
                placeholder="請輸入常用統編"
                errorText=""
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
