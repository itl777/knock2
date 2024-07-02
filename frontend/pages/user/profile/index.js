import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth-context'

import IndexLayout from '@/components/layout'
import UserTab from '@/components/UI/user-tab'
import UserLayout from '@/components/layout/user-layout'
import UserProfileForm from '@/components/page-components/user/user-profile-form'

export default function Profile() {
  const router = useRouter()
  const { auth, authState } = useAuth()

  useEffect(() => {
    if (authState || !router.isReady) return
    if (!auth.id) {
      router.push('/')
    }
  }, [])
  return (
    <>
      <IndexLayout title="商品訂單" background="light">
        <UserLayout userTab={<UserTab />} sectionRight={<UserProfileForm />} />
      </IndexLayout>
    </>
  )
}
