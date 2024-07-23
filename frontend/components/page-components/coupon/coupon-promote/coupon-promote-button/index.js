import { Button } from '@mui/material'
import styles from './coupon-promote-button.module.css'

export default function CouponPromoteButton({
  btnText = 'button',
  type = 'button',
  href = '/',
  onClick = () => {},
  paddingType = '',
  className,
  disabled = false, // 新增 disabled 屬性 by Iris
}) {
  return (
    <Button
      type={type}
      href={href}
      variant="outlined"
      onClick={onClick}
      className={`${styles.button} ${className}`}
      sx={{
        color: 'white',
        fontFamily: 'Noto Serif JP',
        borderRadius: '0',
        borderColor: '#222',
        background: '#222',
        fontSize: '16px',
        padding: paddingType === 'medium' ? '8px 32px' : '8px 16px',
        ':hover': {
          color: 'black',
          borderColor: '#222',
        },
        // disabled style by Iris
        '&.Mui-disabled': {
          color: 'var(--text-grey)',
          borderColor: 'var(--pri-3)',
          background: 'var(--pri-3)',
          cursor: 'not-allowed',
        },
      }}
      disabled={disabled} // 設置 disabled 屬性 by Iris
    >
      {btnText}
      <img src='/order/icon-arrow-special.svg' className={styles.arrow} />
    </Button>
  )
}
