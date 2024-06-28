import { useEffect, useState } from 'react'
import ThemeBranches from '@/components/UI/theme-branches'
import Card02 from '@/components/UI/cards-test'
import GoogleMap from '@/components/UI/google-map'
import { THEME_LIST } from '@/configs/api-path'

export default function ThemeList() {
  const [data, setData] = useState({
    success: false,
    themes: [], // 修改为与后端返回的数据字段一致
  })

  useEffect(() => {
    fetch(`${THEME_LIST}`)
      .then((r) => r.json())
      .then((myData) => {
        console.log(myData)
        setData(myData)
      })
  }, [])

  return (
    <>
      <div className="container">
        {/* 分頁標籤 */}
        <ThemeBranches />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 d-grid d-flex flex-row flex-wrap justify-content-between">
            {data.themes.map((v) => {
              // 修改为与后端返回的数据字段一致
              return (
                <Card02
                  key={v['theme_id']}
                  branchName={v['branch_name']}
                  themeImg={v['theme_img']}
                  themeName={v['theme_name']}
                  difficulty={v['difficulty']}
                  introduction={v['introduction']}
                  min_players={v['min_players']}
                  max_players={v['max_players']}
                  themeTime={v['theme_time']}
                />
              )
            })}
          </div>
          <div>
            <GoogleMap />
          </div>
        </div>
      </div>
    </>
  )
}
