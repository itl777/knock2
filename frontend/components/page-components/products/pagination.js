import Image from 'next/image'
// Paginate
import ReactPaginate from 'react-paginate'
import { Pagination, PaginationItem } from '@mui/material'
// 箭頭圖
import { TbDog } from 'react-icons/tb'

// 改顏色
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/context/theme'

export default function MyPagination() {
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* 1 material方式 */}
        <div className="col-12 d-flex justify-content-center mt-5">
          <Pagination
            size="large"
            count={10}
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

          {/* 2 ReactPaginate方式 */}
          {/* <ReactPaginate
          forcePage={forcePage}
          previousLabel={<Image src={arrowLeft} alt="" />}
          nextLabel={<Image src={arrowRight} alt="" />}
          onPageChange={handlePageChange}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        /> */}
        </div>
      </ThemeProvider>
    </>
  )
}
