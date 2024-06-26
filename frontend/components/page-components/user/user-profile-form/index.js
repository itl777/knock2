import { useState } from 'react'
import styles from './user-profile-form.module.scss'
import UserProfileFormTitle from './title'
import UserProfileInput from './input-item'
import { z } from 'zod'

export default function UserProfileForm() {
  const [profileForm, setProfileForm] = useState({
    account: 'testEmail@test.com',
    password: 'password+password+password',
    name: '',
    nick_name: '',
    mobile_phone: '',
    invoice_carrier_id: '',
    tax_id: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    // 做表單驗證
    const schemaEmail = z.string().email({ message: '請填寫正確Email格式' })

    if (e.target.name === 'email') {
      const result = schemaEmail.safeParse()
    }

    const newForm = { ...profileForm, [name]: value }
    console.log(newForm)
    setProfileForm(newForm)
  }

  return (
    <>
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
              value={profileForm.password}
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
    </>
  )
}
