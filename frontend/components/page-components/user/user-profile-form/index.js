import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useRouter } from 'next/router'
// context
import { useAuth } from '@/context/auth-context'
import { API_SERVER } from '@/configs/api-path'
// styles
import styles from './user-profile-form.module.scss'
// components
import UserProfileFormTitle from './user-profile-title'
import UserProfileInput from './user-profile-input'
import UserProfileRadio from './user-profile-radio'
import UserProfileSelect from './user-profile-select'

export default function UserProfileForm() {
  const { getAuthHeader } = useAuth()
  const [profileForm, setProfileForm] = useState({})
  const [addressForm, setAddressForm] = useState({})
  const [fetchDataState, setFetchDataState] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    console.log(e)
    const { name, value } = e.target

    // 做表單驗證
    const schemaEmail = z.string().email({ message: '請填寫正確Email格式' })

    if (e.target.name === 'account') {
      const result = schemaEmail.safeParse()
    }

    const newForm = { ...profileForm, [name]: value }
    console.log(newForm)
    setProfileForm(newForm)
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

      setProfileForm(data.users)
      setAddressForm(data.address)
      setFetchDataState(true)
    } catch (error) {
      console.error(`fetch-Error: ${error}`)
    }
  }

  useEffect(() => {
    fetchData()
  }, [router, fetchDataState])

  return (
    <>
      {fetchDataState ? (
        <form className={styles['user-profile-form']}>
          <div className={styles['account']}>
            <div className={styles['avatar']}></div>
            <div>
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
          <div className={styles['box']}>
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
                radio={[
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
            </div>
          </div>
          <div className={styles['box']}>
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
                errorText=""
              />
            </div>
          </div>
          <div className={styles['box']}>
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
          <div className={styles['box']}>
            <button type="submit">送出</button>
          </div>
        </form>
      ) : (
        ''
      )}
    </>
  )
}
