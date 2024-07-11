import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { PRODUCT_FAVORITE } from '@/configs/api-path'
import { useSnackbar } from '@/context/snackbar-context'

export default function DeleteIconBtn({
  product_id,
  cardChange,
  setCardChange,
}) {
  const { openSnackbar } = useSnackbar()

  const trashStyle = {
    position: 'absolute',
    top: '6px',
    right: '6px',
    color: '#fff',
  }

  const handleDelete = async () => {
    try {
      const r = await fetch(`${PRODUCT_FAVORITE}/delete/${product_id}`, {
        method: 'DELETE',
      })
      setCardChange(!cardChange)
      openSnackbar('已取消收藏', 'error')
    } catch (ex) {
      console.log('DELETE', ex)
    }
  }
  return (
    <>
      <IconButton
        onClick={handleDelete}
        aria-label="delete"
        size="large"
        sx={trashStyle}
      >
        <DeleteIcon />
      </IconButton>
    </>
  )
}
