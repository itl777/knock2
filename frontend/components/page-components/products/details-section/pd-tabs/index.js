import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import ProductReview from './product-review'
import FilterBtn from '@/components/UI/filter-btn'
import myStyle from './tabs.module.css'

export default function PdTabs() {
  const [value, setValue] = React.useState('1')

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
    <div className={`$myStyle['container'] container`} style={{ padding: 0 }}>
      <Box
        sx={{ width: '100%', typography: 'body1', fontFamily: 'Noto Sans TC' }}
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
            <p>
              ▍遊戲簡介
              訓練乘除法、因數質數與邏輯推理的遊戲。透過卡牌顯示的因數或質數提示，結合卡牌的排列順序，看誰能搶先一步，分析出隱藏在背後的正確謎底。
              乘法計算 因數質數 邏輯推理 ▍遊戲資訊
              遊戲人數：2-9人遊戲時間：15-20分鐘適合年齡：8+ ▍配件內容 數字卡 x
              99 幫助卡 x 9 ▍遊戲目標 猜出左邊玩家的全部數字。 ▍規則簡介
              【數字卡說明】
              ●卡背為P──質數，不能被自己和1以外的自然數整除的數字。
              ●卡背為數字──正面的數字可被卡背的數字整除，卡背的數字是該數字的因數。
              【遊戲設置】依照乘除法的熟練程度，選擇遊戲難易度，並發給每位玩家對應數量的卡。每位玩家秘密查看卡後，將卡背面朝上，依照以下規則擺放：
              十位數相同的卡排同一行 由左至右，數字小的放左邊，大的放右邊。
              從上到下，數字小的放上面，大的放下面。
              【遊戲進行】每位玩家輪流根據數字卡背面的提示，及數字的排列順序，推測左邊玩家的其中一張卡的數字。
              ●推測正確──將該張數字卡翻到正面。 ●推測錯誤──該張卡維持背面朝上。
              猜完一張卡後，就換下一位玩家猜測他/她左邊玩家的一張卡的數字。
              【遊戲結束】當一名玩家的數字卡全部被翻成正面時，遊戲結束，其右邊的玩家獲勝。
            </p>
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
