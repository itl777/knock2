import React, { useState, useEffect } from 'react'
import ThemeBranches from '@/components/page-components/themes/branch-nav/theme-branches'
import GoogleMap from '@/components/UI/google-map'
import IndexLayout from '@/components/layout'
import { BRANCH_LIST } from '@/configs/api-path'

export default function ThemeList() {
  // const [data, setData] = useState({
  //   success: false,
  //   branches: [],
  // })

  // useEffect(() => {
  //   fetch(BRANCH_LIST)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('Branch Data:', data)
  //       setData({
  //         success: true,
  //         branches: data.branches,
  //       })
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching branches:', error)
  //     })
  // }, [])

  return (
    <>
      <IndexLayout pageName="themes" title="密室逃脫" background="dark">
        <div className="container">
          {/* 分页标签 */}
          <ThemeBranches />
        </div>
        <div className="container">
          <div className="row">
            {/* {data.branches.map((branch) => (
              <div key={branch.branch_id} className="col-lg-4 col-md-6 mb-4">
                <GoogleMap
                  branchName={branch.branch_name}
                  openTime={branch.open_time}
                  closeTime={branch.close_time}
                  branchPhone={branch.branch_phone}
                  branchAddress={branch.branch_address}
                />
              </div>
            ))} */}
          </div>
        </div>
      </IndexLayout>
    </>
  )
}
