import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import styles from './input-stepper.module.css'
import { useState } from 'react'
import { IoIosAdd, IoIosRemove } from 'react-icons/io'

export default function InputStepper({
  minValue = 1,
  maxValue = 10,
  stepperValue = 1,
  onQuantityChange, //通知父層更新
}) {
  const [value, setValue] = useState(stepperValue)

  const handleIncrease = () => {
    if (+value >= maxValue) {
      return
    }
    const newStepperValue = +value + 1
    setValue(newStepperValue)
    onQuantityChange(newStepperValue)
  }

  const handleDecrease = () => {
    if (+value <= minValue) {
      return
    }
    const newStepperValue = +value - 1
    setValue(newStepperValue)
    onQuantityChange(newStepperValue)
  }

  const StepperButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: 'white',
    width: '1.5rem',
    height: '1.5rem',
    border: '1px solid var(--input-grey)',
    padding: '4px',
    '&:hover': {
      backgroundColor: 'var(--pri-3)',
    },
  }))

  return (
    <div className={styles.stepperInputContainer}>
      <StepperButton onClick={handleDecrease}>
        <IoIosRemove />
      </StepperButton>

      <div className={styles.stepperValue}>{value}</div>

      <StepperButton onClick={handleIncrease}>
        <IoIosAdd />
      </StepperButton>
    </div>
  )
}
