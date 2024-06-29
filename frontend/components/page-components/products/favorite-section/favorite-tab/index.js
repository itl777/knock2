import * as React from 'react'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import FormatAlignLeftRoundedIcon from '@mui/icons-material/FormatAlignLeftRounded'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import AppsIcon from '@mui/icons-material/Apps'
import ProductTabList from './product-tab-list'

export default function FavoriteTab() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
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
          <ProductTabList />
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
    </Box>
  )
}
