import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

export default function Checkbox({ label = 'label' }) {
  return (
    <FormControlLabel
      control={<Checkbox defaultChecked />}
      label={label}
      sx={{
        color: pink[800],
        '&.Mui-checked': {
          color: pink[600],
        },
      }}
    />
  )
}
