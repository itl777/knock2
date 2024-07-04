import { THEME_LIST, BRANCH_LIST } from '@/configs/api-path'
import { useEffect, useState } from 'react'

import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab, { tabClasses } from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'
import Card02 from '@/components/UI/cards-themes'
import GoogleMap from '@/components/UI/google-map'

export default function ThemeBranches() {
  const [data, setData] = useState({
    success: false,
    themes: [],
  })
  const [data2, setData2] = useState({
    success: false,
    branches: [],
  })
  const [selectedBranch, setSelectedBranch] = useState(1) // 默认选择第一个分店

  useEffect(() => {
    fetch(`${THEME_LIST}?branch_id=${selectedBranch}`)
      .then((response) => response.json())
      .then((myData) => {
        console.log('Theme Data:', myData)
        setData({
          success: true,
          themes: myData.themes,
        })
      })
      .catch((error) => {
        console.error('Error fetching themes:', error)
      })

    fetch(BRANCH_LIST)
      .then((response) => response.json())
      .then((data) => {
        console.log('Branch Data:', data)
        setData2({
          success: true,
          branches: data.branches,
        })
      })
      .catch((error) => {
        console.error('Error fetching branches:', error)
      })
  }, [selectedBranch])

  const handleChange = (event, newValue) => {
    setSelectedBranch(newValue) // 更新选中的分店
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Tabs
        aria-label="tabs"
        value={selectedBranch}
        onChange={handleChange}
        sx={{ bgcolor: 'transparent' }}
        centered
      >
        <TabList
          disableUnderline
          sx={{
            m: 8,
            p: 0.5,
            gap: 6,
            display: 'flex',
            justifyContent: 'space-evenly', // 居中 TabList
          }}
        >
          <hr
            style={{
              borderColor: '#D9D9D9',
              width: '200px',
              opacity: 1,
              marginTop: '22px',
            }}
          />
          <Tab
            disableIndicator
            sx={{
              height: '50px',
              width: '140px',
              fontFamily: 'Noto Serif JP',
              fontWeight: 'bold',
              border: '1px solid',
              borderColor: '#D9D9D9',
              borderRadius: '50px',
              color: '#D9D9D9',
              '&:hover': {
                backgroundColor: '#D9D9D9 !important',
                color: '#676767 !important',
              },
              [`&.${tabClasses.selected}`]: {
                color: '#676767',
                backgroundColor: '#D9D9D9',
              },
            }}
            value={1} // 高雄店的 branch_id
          >
            高雄店
          </Tab>
          <Tab
            disableIndicator
            sx={{
              height: '50px',
              width: '140px',
              fontFamily: 'Noto Serif JP',
              fontWeight: 'bold',
              border: '1px solid',
              borderColor: '#D9D9D9',
              borderRadius: '50px',
              color: '#D9D9D9',
              '&:hover': {
                backgroundColor: '#D9D9D9 !important',
                color: '#676767 !important',
              },
              [`&.${tabClasses.selected}`]: {
                color: '#676767',
                backgroundColor: '#D9D9D9',
              },
            }}
            value={2} // 台中店的 branch_id
          >
            台中店
          </Tab>
          <Tab
            disableIndicator
            sx={{
              height: '50px',
              width: '140px',
              fontFamily: 'Noto Serif JP',
              fontWeight: 'bold',
              border: '1px solid',
              borderColor: '#D9D9D9',
              borderRadius: '50px',
              color: '#D9D9D9',
              '&:hover': {
                backgroundColor: '#D9D9D9 !important',
                color: '#676767 !important',
              },
              [`&.${tabClasses.selected}`]: {
                color: '#676767',
                backgroundColor: '#D9D9D9',
              },
            }}
            value={3} // 台北店的 branch_id
          >
            台北店
          </Tab>
          <hr
            style={{
              borderColor: '#D9D9D9',
              width: '200px',
              opacity: 1,
              marginTop: '22px',
            }}
          />
        </TabList>

        {/* TabPanel for 高雄店 */}
        <TabPanel value={1}>
          <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
            {data.themes.map((theme) => (
              <Card02
                key={theme.theme_id}
                branchName={theme.branch_name}
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
            {data2.branches
              .filter((branch) => branch.branch_id === 3)
              .map((branch) => (
                <GoogleMap
                  key={branch.branch_id}
                  branchName={branch.branch_name}
                  openTime={branch.open_time}
                  closeTime={branch.close_time}
                  branchPhone={branch.branch_phone}
                  branchAddress={branch.branch_address}
                />
              ))}
          </div>
        </TabPanel>

        {/* TabPanel for 台中店 */}
        <TabPanel value={2}>
          <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
            {data.themes.map((theme) => (
              <Card02
                key={theme.theme_id}
                branchName={theme.branch_name}
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
            {data2.branches
              .filter((branch) => branch.branch_id === 2)
              .map((branch) => (
                <GoogleMap
                  key={branch.branch_id}
                  branchName={branch.branch_name}
                  openTime={branch.open_time}
                  closeTime={branch.close_time}
                  branchPhone={branch.branch_phone}
                  branchAddress={branch.branch_address}
                />
              ))}
          </div>
        </TabPanel>

        {/* TabPanel for 台北店 */}
        <TabPanel value={3}>
          <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
            {data.themes.map((theme) => (
              <Card02
                key={theme.theme_id}
                branchName={theme.branch_name}
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
            {data2.branches
              .filter((branch) => branch.branch_id === 1)
              .map((branch) => (
                <GoogleMap
                  key={branch.branch_id}
                  branchName={branch.branch_name}
                  openTime={branch.open_time}
                  closeTime={branch.close_time}
                  branchPhone={branch.branch_phone}
                  branchAddress={branch.branch_address}
                />
              ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}
