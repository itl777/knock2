import * as React from 'react'
import TextField from '@mui/material/TextField'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import { useProduct } from '@/context/product-context'
import { useRouter } from 'next/router'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { BsSearch } from "react-icons/bs";

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#5B5B5B',
            '--TextField-brandBorderHoverColor': 'rgba(34, 34, 34, 1)',
            '--TextField-brandBorderFocusedColor': '#B99755',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&::before': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&::after': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom:
                '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
  })

export default function SearchInput() {
  const outerTheme = useTheme()
  const router = useRouter()

  const { userSearch, setUserSearch } = useProduct()
  const handleSearch = (e) => {
    setUserSearch(e.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()
    router.push({
      pathname: router.pathname,
      query: { ...router.query, userSearch: userSearch },
    })
  }

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <TextField
        label="Search"
        variant="standard"
        value={userSearch}
        sx={{ width: '180px' }}
        onChange={handleSearch}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="handleClick"
                onClick={handleClick}
                edge="end"
              >
                {<BsSearch />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </ThemeProvider>
  )
}
