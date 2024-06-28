// Add Recipient Modal Body 選擇收件人彈出視窗
import styles from './add-recipient-modal-body.module.css'
import BlackBtn from '@/components/UI/black-btn'

export default function AddRecipientModalBody({handleClose}) {


  return (
    <div className={styles.modalBody}>
      add
      <div className={styles.btnStack}>
        <BlackBtn btnText="關閉" onClick={handleClose} href="" />
      </div>
    </div>
  )
}
