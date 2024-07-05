import React from 'react'
import { useState, useEffect } from 'react'
import IndexLayout from '@/components/layout'

export default function ThemeDetails() {
  return (
    <>
      {' '}
      <IndexLayout pageName="themesDetails" title="密室逃脫" background="dark">
        <div className="container"></div>
        <div className="container">
          <div className="row"></div>
        </div>
      </IndexLayout>
    </>
  )
}
