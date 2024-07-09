import { useState, forwardRef } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import styles from './confirm-dialog.module.css'
import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import BlackBtn from '../black-btn'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'visible',
          padding: '1.5rem',
          borderRadius: 'var(--popup-radius)',
          border: '2px solid #A43131',
        },
      },
    },
  },
})

export default function ConfirmDialog({
  open,
  onClose,
  dialogTitle = '標題',
  btnTextRight = '確定',
  btnTextLeft = '取消',
}) {


  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
      >
        <img src="/ghost/ghost_14.png" className={styles.dialogImg} />

        <h5 className={styles.dialogTitle}>{dialogTitle}</h5>

        <div className={styles.btnStack}>
          <BlackBtn
            btnText={btnTextLeft}
            paddingType="medium"
            onClick={onClose}
          />
          <BlackBtn
            btnText={btnTextRight}
            paddingType="medium"
            onClick={onClose}
          />
        </div>
      </Dialog>
    </ThemeProvider>
  )
}
