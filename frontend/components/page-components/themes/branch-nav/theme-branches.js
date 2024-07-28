import { THEME_LIST, BRANCH_LIST } from '@/configs/api-path'
import { useEffect, useState } from 'react'

import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'
import Card02 from '@/components/UI/cards-themes'
import GoogleMap from './google-map.js'
import myStyles from './branch_themes.module.css'

export default function ThemeBranches() {
  const [data, setData] = useState({
    success: false,
    themes: [],
  })
  const [data2, setData2] = useState({
    success: false,
    branches: [],
  })
  const [selectedBranch, setSelectedBranch] = useState(1) // 默認選擇的第一個分店

  useEffect(() => {
    fetch(`${THEME_LIST}?branch_id=${selectedBranch}`)
      .then((response) => response.json())
      .then((myData) => {
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
    setSelectedBranch(newValue) // 更新分店
  }

  return (
    <div className={myStyles.container}>
      <Tabs
        aria-label="tabs"
        value={selectedBranch}
        onChange={handleChange}
        sx={{ bgcolor: 'transparent' }}
      >
        <TabList disableUnderline className={myStyles.tabList}>
          <hr className={myStyles.hr} />
          <Tab
            disableIndicator
            className={`${myStyles.tab} ${
              selectedBranch === 1 ? myStyles.tabSelected : ''
            }`}
            value={1}
          >
            高雄店
          </Tab>
          <Tab
            disableIndicator
            className={`${myStyles.tab} ${
              selectedBranch === 2 ? myStyles.tabSelected : ''
            }`}
            value={2}
          >
            台中店
          </Tab>
          <Tab
            disableIndicator
            className={`${myStyles.tab} ${
              selectedBranch === 3 ? myStyles.tabSelected : ''
            }`}
            value={3}
          >
            台北店
          </Tab>
          <hr className={myStyles.hr} />
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
                branch_themes_id={theme.branch_themes_id}
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
                  mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.4358966739437!2d120.30607541022621!3d22.63753097935983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e04f2bd6ad2a5%3A0x2c7b3141395ed1d6!2zODA36auY6ZuE5biC5LiJ5rCR5Y2A5bu65ZyL5LqM6Lev!5e0!3m2!1szh-TW!2stw!4v1720144112391!5m2!1szh-TW!2stw"
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
                branch_themes_id={theme.branch_themes_id}
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
                  mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.6047285149325!2d120.68295341027968!3d24.15051577830948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d68ef0dfe0d%3A0xadd02f1d10fe2a30!2zNDA05Y-w5Lit5biC5YyX5Y2A5LiA5Lit6KGX!5e0!3m2!1szh-TW!2stw!4v1720143862895!5m2!1szh-TW!2stw"
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
                branch_themes_id={theme.branch_themes_id}
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
                  mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.022028717573!2d121.54899691031233!3d25.03332647772424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abcc4a33bf0d%3A0x13a62643373f0810!2z5Y-w5YyX5biC5aSn5a6J5Y2A5L-h576p6Lev5Zub5q61!5e0!3m2!1szh-TW!2stw!4v1720144026647!5m2!1szh-TW!2stw"
                />
              ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}
