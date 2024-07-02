import { useEffect, useState } from 'react'
import Card02 from '@/components/UI/cards-themes'
import GoogleMap from '@/components/UI/google-map'
import ThemeBranches from '@/components/UI/theme-branches'

export default function ThemeList() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:3001/themes')
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'success') {
          setData(result.themes) // 將從 API 獲取的主題資料設置到狀態中
        } else {
          console.error('Failed to fetch themes:', result.message)
        }
      })
      .catch((error) => {
        console.error('Error fetching themes:', error)
      })
  }, [])

  return (
    <>
      <div className="container">
        <ThemeBranches />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 d-grid d-flex flex-row flex-wrap justify-content-between">
            {data.map((theme) => (
              <Card02
                key={theme.theme_id}
                branchName={theme.branch_name} // 確保這些屬性名稱正確反映你的資料結構
                themeImg={theme.theme_img}
                themeName={theme.theme_name}
                difficulty={theme.difficulty}
                introduction={theme.introduction}
                min_players={theme.min_players}
                max_players={theme.max_players}
                themeTime={theme.theme_time}
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
