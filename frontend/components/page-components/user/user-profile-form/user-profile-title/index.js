import { FaArrowLeftLong } from 'react-icons/fa6'
import Link from 'next/link'

export default function UserProfileFormTitle({ text = '', href = '' }) {
  return (
    <>
      <div className="title">
        <Link href={href}>
          {href === '' ? null : <FaArrowLeftLong />}
          <h5>{text}</h5>
        </Link>
      </div>
      <style jsx>{`
        .title {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1rem;
          padding-bottom: 10px;
          margin-bottom: 20px;
          border-bottom: 1px solid #d9d9d9;
          svg {
            fill: #b99755;
          }
        }
      `}</style>
    </>
  )
}
