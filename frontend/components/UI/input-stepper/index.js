import { IoIosAdd, IoIosRemove } from 'react-icons/io'
import styles from './input-stepper.module.css'

export default function InputStepper({ stepperValue = 1 }) {
  return (
    <div className={styles.stepperInputContainer}>
      <button className={styles.stepperBtn}>
        <IoIosAdd />
      </button>
      <div className={styles.stepperValue}>{stepperValue}</div>
      <button className={styles.stepperBtn}>
        <IoIosRemove />
      </button>
    </div>
  )
}
