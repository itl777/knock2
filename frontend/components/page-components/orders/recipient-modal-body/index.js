// Recipient Modal Body 選擇收件人彈出視窗
import styles from './recipient-modal-body.module.css'
import BlackBtn from '@/components/UI/black-btn'
import RecipientButtonEdit from '../recipient-button-edit'
import RecipientButton from '../recipient-button'
import NoData from '@/components/UI/no-data'

export default function RecipientModalBody({handleClose, openAddRecipientModal}) {


  return (
    <div className={styles.modalBody}>
      <NoData
        text="無收件人資料"
        backgroundColor="#f2f2f2"
        borderRadius="var(--input-radius)"
      />
      <RecipientButtonEdit />
      <RecipientButtonEdit />
      <RecipientButton
        btnText="新增收件人資料"
        iconType="add"
        bgtype="outline"
        onClick={openAddRecipientModal}
      />

      <div className={styles.btnStack}>
        <BlackBtn btnText="關閉" onClick={handleClose} href="" />
      </div>
    </div>
  )
}
