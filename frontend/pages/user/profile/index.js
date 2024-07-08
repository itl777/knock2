import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth-context'

import IndexLayout from '@/components/layout'
import UserTab from '@/components/UI/user-tab'
import UserLayout from '@/components/layout/user-layout'
import UserProfileForm from '@/components/page-components/user/user-profile-form'

export default function Profile() {
  const router = useRouter()
  const { auth, authIsReady } = useAuth()

  useEffect(() => {
    if (!router.isReady) return
    if (!auth.id && authIsReady) {
      router.push('/')
    }
  }, [auth.id, router.isReady, authIsReady])

  return (
    <>
      <IndexLayout title="會員中心" background="light">
        <UserLayout
          userTab={<UserTab />}
          sectionRight={auth.id ? <UserProfileForm /> : ''}
        />
      </IndexLayout>
    </>
  )
}
