import Checkbox from '@mui/material/Checkbox'
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md'

export default function CouponCheckbox({checked, onChange}) {
  return (
    <Checkbox
      sx={{ color: 'white' }}
      icon={
        <MdRadioButtonUnchecked
          style={{ color: '#828282', width: 20, height: 20 }}
        />
      }
      checkedIcon={
        <MdRadioButtonChecked
          style={{ color: 'white', width: 20, height: 20 }}
        />
      }
      checked={checked}
      onChange={onChange}
    />
  )
}
