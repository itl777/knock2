import IndexLayout from '@/components/layout'
import UserTab from '@/components/UI/user-tab'
import UserLayout from '@/components/layout/user-layout'
import UserSet2fa from '@/components/page-components/user/user-set-2fa'

export default function Profile() {
  return (
    <>
      <IndexLayout title="兩步驟驗證" background="light">
        <UserLayout userTab={<UserTab />} sectionRight={<UserSet2fa />} />
      </IndexLayout>
    </>
  )
}
