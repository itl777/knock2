import { useEffect, useState } from 'react'
import ThemeBranches from '@/components/UI/theme-branches'
import Card02 from '@/components/UI/cards-themes'
import GoogleMap from '@/components/UI/google-map'
import { THEME_LIST } from '@/configs/api-path'

export default function ThemeList() {
  // const [data, setData] = useState({
  //   success: false,
  //   themes: [],
  // })
  // const [selectedBranch, setSelectedBranch] = useState() // 默认选择第一个分店

  // useEffect(() => {
  //   fetch(`${THEME_LIST}?branch_id=${selectedBranch}`)
  //     .then((r) => r.json())
  //     .then((myData) => {
  //       console.log(myData)
  //       setData(myData)
  //     })
  // }, [selectedBranch])

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
