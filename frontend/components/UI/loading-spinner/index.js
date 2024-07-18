import ReactDOM from 'react-dom'
import { ClipLoader } from 'react-spinners'
import styles from './loading-spinner.module.css'

const LoadingSpinner = () => {
  return ReactDOM.createPortal(
    <div className={styles.spinnerOverlay}>
      <ClipLoader
        color={'var(--sec-1)'}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>,
    document.body
  )
}

export default LoadingSpinner
