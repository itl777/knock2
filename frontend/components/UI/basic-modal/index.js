// components/UI/basic-modal.jsx
import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '640px',
  height: '640px',
  bgcolor: 'background.paper',
  borderRadius: '1rem',
  boxShadow: ' var(--card-shadow)',
  padding: '1.5rem',
}

export default function BasicModal({
  modalTitle = 'Modal Title',
  modalBody,
  open,
  handleClose,
}) {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h6>{modalTitle}</h6>
          {modalBody}
        </Box>
      </Modal>
    </div>
  )
}
