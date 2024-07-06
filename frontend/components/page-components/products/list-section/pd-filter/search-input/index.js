import * as React from 'react'
import TextField from '@mui/material/TextField'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import { useProduct } from '@/context/product-context'

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
            '--TextField-brandBorderHoverColor': '#5B5B5B',
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

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <TextField label="Search" variant="standard" />
    </ThemeProvider>
  )
}
