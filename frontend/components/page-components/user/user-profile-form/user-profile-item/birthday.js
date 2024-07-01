import styles from './item.module.scss'
import Select01 from '../../../../UI/form-item/select01'
import { useEffect, useState } from 'react'

export default function UserProfileBirthday({
  defaultValue = '',
  label = '',
  name = '',
  errorText = '',
  onChange = () => {},
}) {
  const [newOptions, setNewOptions] = useState({})
  const [value, setValue] = useState({})

  const getYearAndMonthOptions = (defYear, defMonth) => {
    const today = new Date()
    const year = today.getFullYear()

    const years = Array(100)
      .fill()
      .map((v, i) => {
        return { value: year - i, text: `${year - i} 年` }
      })

    const months = Array(12)
      .fill()
      .map((v, i) => {
        return { value: i + 1, text: `${i + 1} 月` }
      })
    if (defYear && defMonth) {
      const date = new Date(defYear, defMonth, 0).getDate()
      const dates = Array(date)
        .fill()
        .map((v, i) => {
          return { value: i + 1, text: `${i + 1} 日` }
        })
      setNewOptions({ years, months, dates })
    }
  }
  const handleValueChange = (e) => {
    const newBirthday = { ...value, [e.name]: e.value }
    setValue(newBirthday)

    const { year, month, date } = newBirthday
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${date
      .toString()
      .padStart(2, '0')}`
    onChange({ name: name, value: formattedDate })
  }
  useEffect(() => {
    if (defaultValue) {
      const data = new Date(defaultValue)
      const newDefaultValue = {
        year: data.getFullYear(),
        month: data.getMonth(),
        date: data.getDate(),
      }
      setValue(newDefaultValue)
      getYearAndMonthOptions(newDefaultValue.year, newDefaultValue.month)
    } else {
      getYearAndMonthOptions()
    }
  }, [])

  return (
    <>
      {newOptions ? (
        <div className={styles.formItem}>
          <label htmlFor={name} className={styles.myLabel}>
            {label}
          </label>
          <div className={styles.myDiv}>
            <div className={styles.birthday}>
              <Select01
                options={newOptions.years}
                defaultValue={value.year}
                name="year"
                placeholder="年"
                onChange={handleValueChange}
              />
              <Select01
                options={newOptions.months}
                defaultValue={value.month}
                name="month"
                placeholder="月"
                onChange={handleValueChange}
              />
              <Select01
                options={newOptions.dates}
                defaultValue={value.date}
                name="date"
                placeholder="日"
                onChange={handleValueChange}
              />
            </div>
            {errorText !== '' ? (
              <span className={styles.errorText}>{errorText}</span>
            ) : (
              ''
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
