import * as React from 'react'
import Select, { selectClasses } from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'

export default function SelectIndicator({
  options = [],
  name = '',
  placeholder = '',
  borderColor = '#d9d9d9',
  borderHoverColor = '#3399ff',
}) {
  return (
    <Select
      name={name}
      placeholder={placeholder}
      indicator={<KeyboardArrowDown />}
      sx={{
        height: 50,
        fontFamily: 'Noto Serif JP',
        borderRadius: '8px',
        border: '2px solid #d9d9d9',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        backgroundColor: '#ffffff',
        borderColor: borderColor,
        [`&:hover`]: {
          backgroundColor: '#ffffff',
          borderColor: borderHoverColor,
        },
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
      }}
      slotProps={{
        listbox: {
          sx: {
            fontFamily: 'Noto Serif JP',
            border: `2px solid ${borderColor}`,
            maxHeight: '200px',
          },
        },
      }}
    >
      {options.map((v) => (
        <Option
          key={v.id}
          value={v.id}
        >{`${v.district_id} ${v.city_name}${v.district_name}${v.address} - ${v.recipient_name} / ${v.recipient_phone}`}</Option>
      ))}
    </Select>
  )
}
