import { Slide, Alert, Snackbar, ThemeProvider } from '@mui/material'
import customTheme, { alertIcons } from './theme'
import Button from '@mui/material/Button'
import { useState } from 'react'

function SlideTransition(props) {
  return <Slide {...props} direction="down" />
}

export default function AutohideSnackbar({
  // open = false,
  text = '成功',
  severity = 'success',
  vertical = 'top',
  horizontal = 'center',
}) {
  const [state, setState] = useState(false)

  const handleClick = () => {
    setState(true)
  }

  const handleClose = () => {
    setState(false)
  }

  return (
    <>
      <Button onClick={handleClick}>Slide Transition1</Button>
      <ThemeProvider theme={customTheme}>
        <Snackbar
          open={state}
          autoHideDuration={1200}
          anchorOrigin={{ vertical, horizontal }}
          TransitionComponent={SlideTransition}
          onClose={handleClose}
        >
          <Alert
            icon={alertIcons[severity]}
            color={severity}
            sx={{ width: '100%' }}
          >
            {text}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </>
  )
}
