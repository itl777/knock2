import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

export default function DeleteIconBtn({product_id,setCardChange}) {
  const trashStyle = {
    position: 'absolute',
    top: '6px',
    right: '6px',
    color: '#fff',
  }

  const handleDelete = async () => {
    try {
      const r = await fetch(
        `http://localhost:3001/products/favorite/delete/${product_id}`,
        {
          method: 'DELETE',
        }
      )
      const result = await r.json()
      console.log('result',result)
      setCardChange(!result.success)
    } catch (ex) {
      console.log('DELETE', ex)
    }
  }
  return (
    <div>
      <IconButton
        onClick={handleDelete}
        aria-label="delete"
        size="large"
        sx={trashStyle}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
