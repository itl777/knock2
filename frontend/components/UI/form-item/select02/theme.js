import { createTheme } from '@mui/material/styles'

const borderColor = '#d9d9d9'
const borderWidth = '2px'
const borderRadius = '8px'
const borderColorHover = '#3399ff'
const borderColorFocus = '#3399ff'
const selectedBackgroundColor = ''
const selectedBackgroundColorHover = ''

const customTheme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          height: '44px',
          width: '100%',
          fontFamily: 'Noto Serif JP, serif',
          '& .MuiSelect-select': {
            padding: '8px 16px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: `${borderWidth} solid ${borderColor}`,
            lineHeight: 1,
            borderRadius: borderRadius,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: borderColorHover,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: borderColorFocus,
          },
          '& .MuiSelect-icon': {
            transition: '200ms',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: `${borderWidth} solid ${borderColor}`,
          borderRadius: borderRadius,
          boxShadow: 'none',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'Noto Serif JP, serif',
          '&.Mui-selected': {
            backgroundColor: selectedBackgroundColor,
          },
          '&.Mui-selected:hover': {
            backgroundColor: selectedBackgroundColorHover,
          },
        },
      },
    },
  },
})

export default customTheme
