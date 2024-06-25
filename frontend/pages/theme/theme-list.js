import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import ThemeBranches from '@/components/UI/theme-branches'

export default function ThemeList() {
  return (
    <>
      <div className="container">
        {/* 分頁標籤 */}
        <ThemeBranches />
      </div>
    </>
  )
}
