import React from 'react'
import ThemeBranches from '@/components/UI/branch-nav/theme-branches'
import GoogleMap from '@/components/UI/google-map'
import IndexLayout from '@/components/layout'

export default function ThemeList() {
  return (
    <>
      <IndexLayout pageName="themes" title="密室逃脫" background="dark">
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
      </IndexLayout>
    </>
  )
}
