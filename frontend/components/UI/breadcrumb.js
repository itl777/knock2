import React from 'react'
import { Breadcrumbs } from '@mui/material'
import { NavigateNextIcon } from '@mui/icons-material'

import Link from 'next/link'
import Typography from '@mui/material/Typography'

export default function Breadcrumb() {
  return (
    <>
      {/* material方式 */}
      {/* <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs> */}

      {/* bootstrap方式 */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            首頁
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            產品列表
          </li>
        </ol>
      </nav>
    </>
  )
}
