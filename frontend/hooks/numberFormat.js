export const formatIntlNumber = (value) => {
  return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
    value
  )
}

export const formatPrice = (value) => {
  const IntlNumber = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
    value
  )
  return `$ ${IntlNumber}`
}
