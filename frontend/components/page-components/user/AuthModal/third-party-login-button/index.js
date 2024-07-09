import { useState } from 'react'
import { IconButton, ThemeProvider } from '@mui/material'
import { FcGoogle } from 'react-icons/fc'
import { FaGoogle } from 'react-icons/fa'
import useFirebase from '@/hooks/useFirebase'

export default function ThirdPartyLoginButton() {
  const { loginWithGooglePopup, loginWithGoogleRedirect } = useFirebase()
  const [googleButtonState, setGoogleButtonState] = useState(false)

  const customTheme = {
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            border: '2px solid #fff',
            color: '#fff',
          },
        },
      },
    },
  }

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <IconButton aria-label="delete" onClick={loginWithGooglePopup}>
          <FcGoogle />
        </IconButton>
        <span>Popup</span>
        <IconButton
          aria-label="delete"
          onClick={loginWithGoogleRedirect}
          onMouseOver={() => setGoogleButtonState(true)}
          onMouseLeave={() => setGoogleButtonState(false)}
        >
          {googleButtonState ? <FcGoogle /> : <FaGoogle />}
        </IconButton>
        <span>Redirect</span>
        {/* <button type="button" onClick={loginWithGooglePopup}>
        loginWithGooglePopup
      </button>
      <button type="button" onClick={loginWithGoogleRedirect}>
        loginWithGoogleRedirect
      </button> */}
      </ThemeProvider>
    </>
  )
}
