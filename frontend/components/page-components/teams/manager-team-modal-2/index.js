import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'

const ManagerTeamModal = ({
  modalTitle = 'Modal Title',
  modalBody,
  open,
  onClose,
  buttonLabel,
  onButtonClick,
  team_id,
  team_limit,
  // modalW = '840px',
  // modalH = '750px',
}) => {
  const [selectedCount, setSelectedCount] = useState(0)
  const [teamLimit, setTeamLimit] = useState(0)

  const handleMemberCountChange = (count, limit) => {
    setSelectedCount(count)
    setTeamLimit(limit)
  }

  const handleButtonClick = () => {
    if (selectedCount <= teamLimit) {
      console.log('111')
      // modalBody.props.handleSubmit()
    }
    if (selectedCount === teamLimit) {
      console.log('222')
      // Add your TeamReady API request logic here
      // Example:
      // await fetch('/api/team-ready', { method: 'POST', body: JSON.stringify({ team_id }) });
    }
    onClose()
  }
  const renderButton = () => {
    if (selectedCount < teamLimit) {
      return (
        <Button sx={button} variant="contained" onClick={handleButtonClick}>
          管理完畢
        </Button>
      )
    } else if (selectedCount === teamLimit) {
      return (
        <Button sx={button} variant="contained" onClick={handleButtonClick}>
          準備成團
        </Button>
      )
    } else if (selectedCount > teamLimit) {
      return (
        <Button sx={button} variant="contained" style={{ color: 'red' }}>
          人數過多
        </Button>
      )
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style, width: '500px' }}>
        <h6 style={modalHeader}>{modalTitle}</h6>
        <hr />
        <div style={modalContent}>
          {React.cloneElement(modalBody, {
            onMemberCountChange: handleMemberCountChange,
          })}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem',
          }}
        >
          {renderButton()}
        </div>
      </Box>
    </Modal>
  )
}

export default ManagerTeamModal

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: modalW,
  // height: modalH,
  bgcolor: 'black',
  // bgcolor: 'background.paper',
  borderRadius: '1rem',
  boxShadow: 'var(--card-shadow)',
  padding: '2.5rem',
  color: '#B99755',
}
const modalHeader = {
  marginBottom: '1.5rem',
  textAlign: 'center',
}

const modalContent = {
  maxHeight: '500px',
  overflowY: 'auto',
  lineHeight: '40px',
}
const button = {
  border: '1px solid black',
  fontFamily: 'Noto Serif JP',
  fontSize: '16px',
  borderRadius: '30px',
  backgroundColor: '#B99755',
  color: 'white',
  padding: '10px 30px',
  '&:hover': {
    backgroundColor: 'white',
    color: '#B99755',
    boxShadow: 'none',
  },
  boxShadow: 'none',
}
