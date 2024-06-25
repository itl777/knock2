export default function UserProfileFormTitle({ text = '' }) {
  return (
    <>
      <p className="title">{text}</p>
      <style jsx>{`
        .title {
          width: 100%;
        }
      `}</style>
    </>
  )
}
