import { useState, useCallback } from 'react'

export const useOrderValidation = () => {
  const [errors, setErrors] = useState({})

  const validateInvoice = useCallback((name, value) => {
    const mobileRegex = /^\/[0-9A-Z.-]{7}$/ // 手機載具驗證
    const taxRegex = /^\d{8}$/ // 統一編號驗證

    let errorText = ''

    if (value === '') {
      errorText = '必填'
    } else {
      if (name === 'mobileInvoice' && !mobileRegex.test(value)) {
        errorText = '格式不符'
      } else if (name === 'recipientTaxId' && !taxRegex.test(value)) {
        errorText = '格式不符'
      }
    }

    setErrors((v) => ({
      ...v,
      [name]: errorText,
    }))
  }, [])

  const clearError = useCallback((name) => {
    setErrors((v) => ({
      ...v,
      [name]: '',
    }))
  }, [])

  return { errors, validateInvoice, clearError }
}
