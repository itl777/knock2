import { z } from 'zod'

export const schemaLoginForm = z.object({
  account: z
    .string({
      required_error: '請填寫帳號',
    })
    .email({
      message: '請填寫有效的電子郵件地址',
    })
    .max(100, {
      message: '帳號長度最多為 100 個字元',
    }),
  password: z
    .string({
      required_error: '請填寫密碼',
    })
    .min(8, {
      message: '密碼長度至少為 8 個字元',
    })
    .max(100, {
      message: '密碼長度最多為 100 個字元',
    }),
})

export const schemaRegisterForm = z.object({
  account: z
    .string({
      required_error: '請填寫帳號',
    })
    .email({
      message: '請填寫有效的電子郵件地址',
    })
    .max(100, {
      message: '帳號長度最多為 100 個字元',
    }),
  password: z
    .string({
      required_error: '請填寫密碼',
    })
    .min(8, {
      message: '密碼長度至少為 8 個字元',
    })
    .max(100, {
      message: '密碼長度最多為 100 個字元',
    }),
  reenter_password: z
    .string({
      required_error: '請確認密碼',
    })
    .refine((data) => data.password === data.reenter_password, {
      message: '兩次輸入的密碼不一致',
    }),
  name: z
    .string()
    .min(2, {
      message: '請填寫姓名，長度為 2 ~ 20 個字元',
    })
    .max(20, {
      message: '請填寫姓名，長度為 2 ~ 20 個字元',
    }),
})

export const schemaForgetPasswordForm = z.object({
  account: z
    .string({
      required_error: '請填寫帳號',
    })
    .email({
      message: '請填寫有效的電子郵件地址',
    })
    .max(100, {
      message: '帳號長度最多為 100 個字元',
    }),
  password: z
    .string({
      required_error: '請填寫密碼',
    })
    .min(8, {
      message: '密碼長度至少為 8 個字元',
    })
    .max(100, {
      message: '密碼長度最多為 100 個字元',
    }),
})
