import myStyle from './details.module.css'
export default function DetailsSection({ breadcrumb, features, tab }) {
  return (
    <>
      {breadcrumb}
      <div className={myStyle.section}>
        {features}
        {tab}
      </div>
    </>
  )
}
