import { THEME_LIST } from '@/configs/api-path'
import { useEffect, useState } from 'react'

import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab, { tabClasses } from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'
import Card02 from '@/components/UI/cards-themes'

export default function ThemeBranches() {
  const [data, setData] = useState({
    success: false,
    themes: [],
  })
  const [selectedBranch, setSelectedBranch] = useState(1) // 默認選擇第一個分店

  useEffect(() => {
    fetch(`${THEME_LIST}?branch_id=${selectedBranch}`)
      .then((r) => r.json())
      .then((myData) => {
        console.log(myData)
        setData(myData)
      })
  }, [selectedBranch])

  const handleChange = (e, newValue) => {
    setSelectedBranch(newValue) // 更新選中的分店
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
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
            justifyContent: 'center', // 居中 TabList
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
                color: '#676767 !重要',
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
        <TabPanel value={1}>
          <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
            {data.themes.map((v) => (
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
            ))}
          </div>
        </TabPanel>
        <TabPanel value={2}>
          <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
            {data.themes.map((v) => (
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
            ))}
          </div>
        </TabPanel>
        <TabPanel value={3}>
          <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
            {data.themes.map((v) => (
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
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}
