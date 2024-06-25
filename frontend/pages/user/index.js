import IndexLayout from '@/components/layout'
import UserProfileForm from '@/components/page-components/user/user-profile-form'

export default function User() {
  return (
    <>
      <IndexLayout title="會員中心" background="dark">
        <UserProfileForm />
      </IndexLayout>
    </>
  )
}
