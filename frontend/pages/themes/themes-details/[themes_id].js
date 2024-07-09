import React from 'react'
import { useState, useEffect } from 'react'
import IndexLayout from '@/components/layout'
import DetailSection from '@/components/page-components/themes/detail-section'

export default function ThemeDetails() {
  return (
    <>
      <IndexLayout pageName="themesDetails" title="密室逃脫" background="dark">
        <div>
          <DetailSection />
        </div>
        <div className="container">
          <div className="row"></div>
        </div>
      </IndexLayout>
    </>
  )
}
