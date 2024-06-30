import { Box, List, ListItem, Radio, RadioGroup } from '@mui/joy'
import { useEffect, useState } from 'react'

export default function Radio01({
  radios = [],
  name = '',
  checked = '',
  disabled = false,
  onChange = () => {},
}) {
  const [radiosArray, setRadiosArray] = useState(false)

  useEffect(() => {
    if (!Array.isArray(radios)) {
      console.error('提供的radios不是陣列，請確認 >>', radios)
      return
    }
    console.log(radiosArray)
    setRadiosArray(true)
  }, [radios])
  return (
    <>
      {radiosArray ? (
        <Box
          height={44}
          display="flex"
          alignItems="center"
          sx={{ width: '100%' }}
        >
          <RadioGroup overlay name={name}>
            <List component="div" orientation="horizontal">
              {radios?.map((v, i) => (
                <ListItem key={i}>
                  <Radio
                    value={v.value}
                    label={v.label}
                    disabled={disabled}
                    checked={checked === v.value}
                    onChange={onChange}
                  />
                </ListItem>
              ))}
            </List>
          </RadioGroup>
        </Box>
      ) : (
        ''
      )}
    </>
  )
}
