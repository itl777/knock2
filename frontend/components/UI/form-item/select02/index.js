import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { ThemeProvider } from '@mui/material/styles'
import customTheme from './theme'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

export default function Select02({
  name = '',
  value = '',
  placeholder = '',
  options = [],
  onChange = () => {},
}) {
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Select
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          IconComponent={KeyboardArrowDownRoundedIcon}
        >
          {options.map((v, i) => (
            <MenuItem key={i} value={v.value}>
              {v.text}
            </MenuItem>
          ))}
        </Select>
      </ThemeProvider>
    </>
  )
}
