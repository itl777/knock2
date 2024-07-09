import { useState } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'

import { useAuth } from '@/context/auth-context'
import { API_SERVER } from '@/configs/api-path'
import { useSnackbar } from '@/context/snackbar-context'
import DropZone from './drop-zone'

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material'
import { styled } from '@mui/material/styles'
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
  const { openSnackbar } = useSnackbar()
  const { auth, getAuthHeader } = useAuth()
  const [imgUrl, setImgUrl] = useState('')

  const onDrop = (acceptedFiles) => {
    const img_url = URL.createObjectURL(acceptedFiles[0])

    setImgUrl(img_url)
  }

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': [
        '.jpeg',
        '.jpg',
        '.png',
        '.gif',
        '.bmp',
        '.webp',
        '.tiff',
        '.svg',
      ],
    },
    maxSize: 2097152, // 2MB
  })

  const avatarSubmit = () => {
    const formData = new FormData()
    formData.append('user_id', auth.id)
    formData.append('avatar', acceptedFiles[0])

    console.log(formData)

    const url = `${API_SERVER}/users/upload-avatar`
    const option = {
      method: 'POST',
      body: formData,
      headers: {
        ...getAuthHeader(),
      },
    }
    fetch(url, option)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          close()
          openSnackbar('新增成功', 'success')
        } else {
          openSnackbar('新增失敗', 'error')
        }
      })
      .catch((err) => {
        console.error(err)
        openSnackbar('連線失敗', 'error')
      })
  }

  return (
    <>
      <BootstrapDialog
        onClose={close}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <h5>上傳頭像</h5>
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
        <form>
          <DialogContent dividers>
            {imgUrl ? (
              <Image
                src={imgUrl}
                alt="avatar"
                width={250}
                height={250}
                style={{
                  objectFit: 'contain',
                  background: '#222222',
                  borderRadius: '125px',
                }}
              />
            ) : (
              ''
            )}
            <DropZone
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              isDragActive={isDragActive}
              isDragReject={isDragReject}
              isDragAccept={isDragAccept}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={close}>取消</Button>
            <Button onClick={avatarSubmit}>確定</Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </>
  )
}
