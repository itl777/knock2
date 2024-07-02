export default function UserProfileFormTitle({ text = '' }) {
  return (
    <>
      <h3 className="title">{text}</h3>
      <style jsx>{`
        .title {
          width: 100%;
          padding-bottom: 10px;
          margin-bottom: 20px;
          border-bottom: 1px solid #d9d9d9;
        }
      `}</style>
    </>
  )
}
