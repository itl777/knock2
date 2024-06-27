import { Box, List, ListItem, Radio, RadioGroup } from '@mui/joy'

export default function Radio01({
  radio = [],
  name = '',
  checked = '0',
  disabled = false,
  onChange = () => {},
}) {
  return (
    <Box height={50} display="flex" alignItems="center" sx={{ width: '100%' }}>
      <RadioGroup overlay name={name}>
        <List component="div" orientation="horizontal">
          {radio?.map((v, i) => {
            return (
              <ListItem key={i}>
                <Radio
                  value={v.value}
                  label={v.label}
                  disabled={disabled}
                  checked={checked === v.value}
                  onChange={onChange}
                />
              </ListItem>
            )
          })}
        </List>
      </RadioGroup>
    </Box>
  )
}
