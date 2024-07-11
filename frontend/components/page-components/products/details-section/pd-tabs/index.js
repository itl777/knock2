import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import ProductReview from './product-review'
import FilterBtn from '@/components/UI/filter-btn'
import myStyle from './tabs.module.css'

export default function PdTabs({ data }) {
  const [value, setValue] = useState('1')
  const [productData, setProductData] = useState({
    product_name: '',
    price: 0,
    summary: '',
    players: '',
    age: '',
    category_id: 0,
  })

  useEffect(() => {
    if (data && data.length > 0) {
      const newData = { ...data[0] }
      // console.log('newData', newData)
      setProductData(newData)
    }
  }, [data])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const mySxTab = {
    fontFamily: 'Noto Serif JP',
    border: 1,
    color: 'black',
    borderColor: '#8C764C',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
    borderBottom: '#fff',
    width: '185px',
    height: ' 53.5px',
    marginRight: '25px',
    fontSize: 18,
    fontWeight: 600,
    '&.Mui-selected': {
      color: '#fff',
      backgroundColor: '#B99755',
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#B99755',
    },
  }
  const mySxPanel = {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '80px 120px',
    boxShadow: 2,
  }

  return (
    <div className={`${myStyle['container']} container`} style={{ padding: 0 }}>
      <Box
        sx={{
          width: '100%',
          typography: 'body1',
          fontFamily: 'Noto Sans TC',
          maxWidth: '1200px',
        }}
      >
        <TabContext value={value}>
          <Box>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: '#B99755',
                },
              }}
            >
              <Tab sx={mySxTab} label="商品詳情" value="1" />
              <Tab sx={mySxTab} label="商品評價" value="2" />
            </TabList>
          </Box>
          <TabPanel sx={mySxPanel} value="1">
            {/* 詳情 */}
            <p>{productData.description}</p>
          </TabPanel>

          <TabPanel sx={mySxPanel} value="2">
            {/* 評價 */}
            <div className="col-10 offset-1 d-flex justify-content-center my-5 position-relative">
              <ProductReview />
            </div>
            {/* 評價 */}

            <div className="col-10 offset-1 d-flex justify-content-center my-5 position-relative">
              <ProductReview />
            </div>
            <div className="col-10 offset-1 d-flex justify-content-center my-5">
              <FilterBtn btnText={'更多評論'} />
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  )
}
