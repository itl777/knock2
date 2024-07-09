import styles from './drop-zone.module.scss'

export default function DropZone({
  getRootProps,
  getInputProps,
  isDragActive,
  isDragReject,
  isDragAccept,
}) {
  return (
    <>
      <div
        {...getRootProps({
          className: `
            ${styles.dorpZone} 
            ${isDragAccept ? styles.accept : ''}
            ${isDragReject ? styles.reject : ''}
                `,
        })}
        Ｆ
        style={{ width: '100%', backgroundColor: '#aaaaaa' }}
      >
        <input {...getInputProps()} />
        {isDragAccept && <p>此檔案可以上傳</p>}
        {isDragReject && <p>請選擇圖片檔或檔案大小超過限制(2MB)</p>}
        {!isDragActive && <p>請點選上傳或拖放檔案</p>}
      </div>
    </>
  )
}
