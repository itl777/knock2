import { Pagination, PaginationItem } from '@mui/material'
// 箭頭圖
import { TbDog } from 'react-icons/tb'
import { useState } from 'react'
// 改顏色
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/context/theme'

export default function MyPagination({ totalPages, setPage }) {
  const handlePageChange = (event, value) => {
    console.log('MyPagination', value)
    setPage(value)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* 1 material方式 */}
        <div className="col-12 d-flex justify-content-center mt-5">
          <Pagination
            onChange={handlePageChange}
            size="large"
            count={totalPages}
            defaultPage={1}
            color="primary"
            renderItem={(item) => (
              <PaginationItem
                sx={{
                  color: '#B99755',
                  ':hover': {
                    backgroundColor: 'rgba(185, 151, 85, 0.20)',
                  },
                }}
                slots={{
                  previous: TbDog,
                  next: TbDog,
                }}
                {...item}
              />
            )}
          />
        </div>
      </ThemeProvider>
    </>
  )
}
