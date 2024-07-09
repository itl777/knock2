import React, { useState, useRef, useEffect } from 'react'
import Cropper from 'cropperjs'
import styles from '@/node_modules/cropperjs/dist/cropper.css'
import { Slider } from '@mui/material'

const AvatarEditor = () => {
  const [image, setImage] = useState(null)
  const [cropper, setCropper] = useState(null)
  const imageRef = useRef(null)
  const croppedImageRef = useRef(null)

  const handleImageChange = (e) => {
    e.preventDefault()
    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const handleCrop = () => {
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas()
      const croppedImage = croppedCanvas.toDataURL('image/png')
      if (croppedImageRef.current) {
        croppedImageRef.current.src = croppedImage
      }
    }
  }

  const handleSliderChange = (event, newValue) => {
    if (cropper) {
      cropper.zoomTo(newValue)
    }
  }

  useEffect(() => {
    if (image && imageRef.current) {
      const cropperInstance = new Cropper(imageRef.current, {
        aspectRatio: 1,
        viewMode: 1,
        autoCropArea: 1,
        dragMode: 'move',
        scalable: true,
        zoomable: true,
      })
      setCropper(cropperInstance)
    }
  }, [image])

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && (
        <img
          ref={imageRef}
          src={image}
          alt="Source"
          className={styles.cropper}
        />
      )}
      {image && (
        <>
          <Slider
            defaultValue={1}
            step={0.1}
            min={0.1}
            max={3}
            onChange={handleSliderChange}
            aria-labelledby="Zoom"
          />
          <button onClick={handleCrop}>Crop</button>
          <div>
            <h3>Cropped Image:</h3>
            <img ref={croppedImageRef} alt="Cropped" />
          </div>
        </>
      )}
    </div>
  )
}

export default AvatarEditor
