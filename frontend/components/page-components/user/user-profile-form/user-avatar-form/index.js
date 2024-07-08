import { useState } from 'react'
import Image from 'next/image'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

export default function AvatarFormDialogs({ open, close }) {
  const [imgUrl, setImgUrl] = useState('')

  const handleFileChange = (event) => {
    // setImgUrl(event.target.files[0])
    console.log(event.target.files[0])
    const img_url = URL.createObjectURL(event.target.files[0])
    setImgUrl(img_url)
  }

  return (
    <>
      <BootstrapDialog
        onClose={close}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          上傳頭像
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={close}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form>
            <Image src={imgUrl} alt="avatar" width={200} height={200} />
            <input type="file" onChange={handleFileChange} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Save changes</Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  )
}
