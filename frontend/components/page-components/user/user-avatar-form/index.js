import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import styles from './avatar-editor.module.scss'

import { useAuth } from '@/context/auth-context'
import { API_SERVER } from '@/configs/api-path'
import { useSnackbar } from '@/context/snackbar-context'
import DropZone from './drop-zone'
import AvatarDialog from './avatar-dialog'
import ZoomSlider from './zoom-slider'
import { FaImage } from 'react-icons/fa6'

export default function AvatarFormDialogs({ openDialog, closeDialog }) {
  const { openSnackbar } = useSnackbar()
  const { auth, setAuthRefresh, getAuthHeader } = useAuth()
  const [imgUrl, setImgUrl] = useState('')
  // cropper
  const [cropper, setCropper] = useState(null)
  const imageRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles[0].size > 2097152) {
      openSnackbar('圖片請小於 2MB', 'error')
      return
    }
    const img_url = URL.createObjectURL(acceptedFiles[0])

    setImgUrl(img_url)
  }

  const {
    open,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop,
    noClick: true,
    multiple: false,
    accept: {
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': [],
      'image/gif': [],
      'image/bmp': [],
      'image/webp': [],
      'image/tiff': [],
      'image/svg': [],
    },
  })

  const [zoomValue, setZoomValue] = useState(0.1)

  const handleZoomChange = (event, newValue) => {
    if (newValue < 0.1) newValue = 0.1
    if (newValue > 2) newValue = 2

    if (cropper) {
      // 計算zoom變化
      const zoomChange = newValue - zoomValue
      cropper.zoom(zoomChange)
      setZoomValue(newValue)
    }
  }

  const avatarSubmit = () => {
    if (!cropper) return

    cropper.getCroppedCanvas({ width: 250, height: 250 }).toBlob((blob) => {
      const formData = new FormData()
      formData.append('user_id', auth.id)
      formData.append('avatar', blob, 'cropped-image.png')

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
            closeDialog()
            setImgUrl('')
            setAuthRefresh(true)
            openSnackbar('新增成功', 'success')
          } else {
            openSnackbar('新增失敗', 'error')
          }
        })
        .catch((err) => {
          console.error(err)
          openSnackbar('連線失敗', 'error')
        })
      if (cropper) cropper.destroy()
      setCropper(null)
      setImgUrl('')
      imageRef.current = null
      setZoomValue(0.1)
    })
  }

  useEffect(() => {
    if (imgUrl && imageRef.current) {
      if (cropper) {
        cropper.replace(imgUrl)
      } else {
        const cropperInstance = new Cropper(imageRef.current, {
          viewMode: 1,
          center: false, // 中心十字
          guides: false, // 裁切格線
          background: false, // 背景有沒有透明隔線
          dragMode: 'move', // 設置為 'move' 只允許移動圖片
          scalable: false, // 禁止調整大小
          cropBoxMovable: false, // 禁止移動裁剪框
          cropBoxResizable: false, // 禁止裁剪框調整大小
          zoomOnTouch: false, // 禁止觸控縮放
          zoomOnWheel: false, // 禁止滾輪縮放
          ready() {
            const containerData = this.cropper.getContainerData()
            const cropBoxData = {
              left: (containerData.width - 250) / 2,
              top: (containerData.height - 250) / 2,
              width: 250,
              height: 250,
            }
            this.cropper.setCropBoxData(cropBoxData)
            this.cropper.setCanvasData(cropBoxData)
          },
        })
        setCropper(cropperInstance)
      }
    }
  }, [imgUrl])

  return (
    <>
      <AvatarDialog
        cropper={cropper}
        setCropper={setCropper}
        setImgUrl={setImgUrl}
        imageRef={imageRef}
        openDialog={openDialog}
        closeDialog={closeDialog}
        avatarSubmit={avatarSubmit}
        setZoomValue={setZoomValue}
      >
        <DropZone
          openBtn={open}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
          isDragAccept={isDragAccept}
          hasImage={!!imgUrl}
        >
          <div className={styles.cropperContainer}>
            {imgUrl ? (
              <Image
                ref={imageRef}
                src={imgUrl}
                width={250}
                height={250}
                alt="avatar"
                style={{
                  objectFit: 'contain',
                  background: '#222222',
                  borderRadius: '50%',
                  margin: '0 auto',
                }}
              />
            ) : (
              <FaImage style={{ fontSize: '5rem' }} />
            )}
          </div>
        </DropZone>
        <ZoomSlider
          disabled={!imgUrl}
          value={zoomValue}
          zoomChange={handleZoomChange}
        />
      </AvatarDialog>
    </>
  )
}
