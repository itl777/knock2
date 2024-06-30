import { useEffect, useState } from 'react'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import FormatAlignLeftRoundedIcon from '@mui/icons-material/FormatAlignLeftRounded'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import AppsIcon from '@mui/icons-material/Apps'
import ProductTabList from './product-tab-list'
import myStyle from './favorite-tab.module.css'
import { color } from 'framer-motion'

export default function FavoriteTab() {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [data, setData] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(`http://127.0.0.1:3001/products/favorite`)
      .then((r) => r.json())
      .then((data) => {
        console.log('FavoriteTab', data)
        //   {
        //     "success": true,
        //     "page": 1,
        //     "totalRows": 5,
        //     "totalPages": 1,
        //     "rows": [ 每筆obj資料 ]
        // }
        setData(data)
      })
  }, [page])

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList
            style={{ justifyContent: 'end' }}
            className={myStyle.right}
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab
              value="1"
              icon={<FormatAlignLeftRoundedIcon />}
              aria-label="AlignLeft"
            />
            <Tab
              value="2"
              icon={<AppRegistrationIcon />}
              aria-label="favorite"
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          {/* 一般卡片列表 */}
          <ProductTabList favData={data} />
        </TabPanel>

        <TabPanel value="2">
          {/* 有分類的卡片列表 */}
          Item Two
        </TabPanel>
      </TabContext>
    </Box>
  )
}
