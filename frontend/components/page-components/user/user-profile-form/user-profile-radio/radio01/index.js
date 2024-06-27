import Box from '@mui/joy/Box'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import Radio from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'
import { useState } from 'react'

export default function UserProfileRadio({
  radio = [],
  name = '',
  DBvalue = '',
  disabled = false,
}) {
  const [selectedValue, setSelectedValue] = useState(DBvalue)

  const handleChange = (event) => {
    setSelectedValue(event.target.value)
  }
  return (
    <Box height={50} display="flex" alignItems="center" sx={{ width: '100%' }}>
      <RadioGroup overlay name="example-payment-channel" defaultValue="Paypal">
        <List component="div" orientation="horizontal">
          {radio?.map((v, i) => {
            return (
              <ListItem key={i}>
                <Radio
                  value={v.value}
                  label={v.label}
                  name={name}
                  disabled={disabled === true ? disabled : ''}
                  checked={selectedValue === v.value}
                  onChange={handleChange}
                />
              </ListItem>
            )
          })}
        </List>
      </RadioGroup>
    </Box>
  )
}
