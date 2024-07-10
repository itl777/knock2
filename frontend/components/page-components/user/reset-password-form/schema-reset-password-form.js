import { z } from 'zod'

export const schemaResetPasswordForm = z
  .object({
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
        required_error: '請再次填寫密碼',
      })
      .min(8, {
        message: '請再次填寫密碼',
      }),
  })
  .refine((data) => data.password === data.reenter_password, {
    message: '兩次輸入的密碼不一致',
    path: ['reenter_password'],
  })