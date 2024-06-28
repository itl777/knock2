import { useEffect, useState } from 'react'
import ThemeBranches from '@/components/UI/theme-branches'
import Card02 from '@/components/UI/cards-test'
import GoogleMap from '@/components/UI/google-map'

export default function ThemeList() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:3001/themes')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        console.log(data) // 確認資料結構是否正確
        setData(data.rows || []) // 將資料設置到 state 中，如果沒有 rows 屬性則設置為空陣列
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
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
            {data.map((v) => (
              <Card02
                key={v.theme_id}
                branchName={v.branch_name}
                themeImg={v.theme_img}
                themeName={v.theme_name}
                difficulty={v.difficulty}
                introduction={v.introduction}
                min_players={v.min_players}
                max_players={v.max_players}
                themeTime={v.theme_time}
              />
            ))}
          </div>
          <div>
            <GoogleMap />
          </div>
        </div>
      </div>
    </>
  )
}
