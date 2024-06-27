import { IoIosAdd, IoIosRemove } from 'react-icons/io'
import styles from './input-stepper.module.css'
import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'

export default function InputStepper({
  minValue = 1,
  maxValue = 10,
  stepperValue = 1,
}) {
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

  const [value, setValue] = useState(stepperValue)
  console.log(value)

  const handleIncrease = () => {
    if (+value >= maxValue) {
      return
    } else {
      const newStepperValue = +value + 1
      setValue(newStepperValue)
    }
  }

  const handleDecrease = () => {
    if (+value <= minValue) {
      return
    } else {
      const newStepperValue = +value - 1
      setValue(newStepperValue)
    }
  }

  return (
    <div className={styles.stepperInputContainer}>
      <StepperButton>
        <IoIosRemove onClick={handleDecrease} />
      </StepperButton>

      <div className={styles.stepperValue}>{value}</div>

      <StepperButton>
        <IoIosAdd onClick={handleIncrease} />
      </StepperButton>
    </div>
  )
}
