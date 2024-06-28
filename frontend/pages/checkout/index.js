import React from 'react'
import IndexLayout from '@/components/layout'
import CheckOutPage from '@/components/page-components/checkout/checkout-page'

export default function OrderDetailsPage() {
  return (
    <>
      <IndexLayout title="結帳" background="light">
        <CheckOutPage />
      </IndexLayout>
    </>
  )
}
