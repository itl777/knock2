import React from 'react'
import ThemeBranches from '@/components/UI/branch-nav/theme-branches'
import GoogleMap from '@/components/UI/google-map'

export default function ThemeList() {
  return (
    <>
      <div className="container">
        {/* 分頁標籤 */}
        <ThemeBranches />
      </div>
      <div className="container">
        <div className="row">
          <div>
            <GoogleMap />
          </div>
        </div>
      </div>
    </>
  )
}
