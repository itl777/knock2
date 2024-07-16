import IconButton from '@mui/material/IconButton'
import { HiOutlineInformationCircle } from 'react-icons/hi'
export default function MoreInfoBtn({ onClick }) {
  return (
    <IconButton
      sx={{ color: '#d7d7d7', padding: '0', width: 18, height: 18 }}
    >
      <HiOutlineInformationCircle onClick={onClick} />
    </IconButton>
  )
}
