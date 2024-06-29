import * as React from 'react'
import Select, { selectClasses } from '@mui/joy/Select'
import { Option, Typography } from '@mui/joy'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'

export default function Select01({
  options = [],
  name = '',
  borderColor = '#d9d9d9',
  borderHoverColor = '#3399ff',
}) {
  if (!Array.isArray(options)) {
    return (options = [])
  }

  const getPlaceholderText = (options) => {
    const item = options.find((v) => v.type === '1')
    return item?.id
  }

  return (
    <>
      <Select
        name={name}
        defaultValue={getPlaceholderText(options)}
        indicator={<KeyboardArrowDown />}
        sx={{
          height: 44,
          fontFamily: 'Noto Serif JP',
          borderRadius: '8px',
          border: '2px solid #d9d9d9',
          boxShadow: 'none',
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
              width: 1,
            },
          },
        }}
      >
        {options.map((v) => (
          <Option
            key={v.id}
            value={v.id}
            sx={{
              whiteSpace: 'normal',
              // maxWidth: '350px',
              width: 1,
              maxWidth: {
                xs: 350,
                sm: 560,
                md: 860,
                lg: 1160,
                xl: 1,
              },
            }}
          >
            <Typography
              sx={{
                width: 1,
                fontFamily: 'Noto Serif JP',
                whiteSpace: 'normal',
              }}
            >{`${v.district_id} ${v.city_name}${v.district_name}${v.address} - ${v.recipient_name} / ${v.recipient_phone}`}</Typography>
          </Option>
        ))}
      </Select>
    </>
  )
}
