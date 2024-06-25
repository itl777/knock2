import * as React from 'react'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab, { tabClasses } from '@mui/joy/Tab'

export default function ThemeBranches() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: 'transparent' }}>
        <TabList
          disableUnderline
          sx={{
            m: 8,
            p: 0.5,
            gap: 6,
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
      </Tabs>
    </div>
  )
}
