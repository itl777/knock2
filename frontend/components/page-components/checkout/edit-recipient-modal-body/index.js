// Add Recipient Modal Body 選擇收件人彈出視窗
import styles from './edit-recipient-modal-body.module.css'
import BlackBtn from '@/components/UI/black-btn'

export default function EditRecipientModalBody({ handleClose }) {

  return (
    <div className={styles.modalBody}>
      Edit
      <div className={styles.btnStack}>
        <BlackBtn btnText="關閉" onClick={handleClose} href="" paddingType='medium' />
      </div>
    </div>
  )
}
