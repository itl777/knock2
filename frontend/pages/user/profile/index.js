import IndexLayout from '@/components/layout'
import UserTab from '@/components/UI/user-tab'
import UserTabSec from '@/components/UI/user-tab-sec'
import UserLayout from '@/components/layout/user-layout'
import UserProfileForm from '@/components/page-components/user/user-profile-form'

export default function Profile() {
  return (
    <>
      <IndexLayout title="商品訂單" background="light">
        <UserLayout
          userTab={<UserTab />}
          sectionRight={<UserProfileForm />}
        />
      </IndexLayout>
    </>
  )
}
