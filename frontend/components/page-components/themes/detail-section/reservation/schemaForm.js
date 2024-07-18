import { z } from 'zod'

// Helper to remove '-' from mobile
const sanitizeMobile = (mobile_phone) => mobile_phone.replace(/-/g, '')

// Form validation schema
const schemaForm = z.object({
  name: z
    .string()
    .min(2, {
      message: '請填寫姓名，長度為 2 ~ 20 個字元',
    })
    .max(20, {
      message: '請填寫姓名，長度為 2 ~ 20 個字元',
    }),
  mobile_phone: z
    .string({
      required_error: '請填寫手機號碼',
    })
    .min(1, { message: '請填寫手機號碼' })
    .refine(
      (val) => {
        const mobilePattern = /^09\d{8}$/
        return mobilePattern.test(val)
      },
      {
        message: ' 請填寫正確的手機號碼格式',
      }
    ),
  date: z.string().refine(
    (val) => {
      return /^\d{4}-\d{2}-\d{2}$/.test(val) && !isNaN(Date.parse(val))
    },
    {
      message: '無效的日期格式，請重新選擇',
    }
  ),
})

export default schemaForm
