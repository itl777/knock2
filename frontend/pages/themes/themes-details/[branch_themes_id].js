import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import IndexLayout from '@/components/layout'
import DetailSection from '@/components/page-components/themes/detail-section'
import Banner from '@/components/page-components/themes/detail-section/banner/banner'
import Item from '@/components/page-components/themes/detail-section/item/item'
import Step from '@/components/page-components/themes/detail-section/step/step'
import Calendar from '@/components/page-components/themes/detail-section/calendar/calendar'
import { ThemeProvider, useTheme } from '@/context/theme-context'

function ThemeDetailsContent() {
  const router = useRouter()
  const { themeDetails, getThemeDetails } = useTheme()
  const [themeName, setThemeName] = useState('')

  useEffect(() => {
    if (router.isReady && router.query.branch_themes_id) {
      getThemeDetails(router.query.branch_themes_id)
    }
  }, [router.isReady, router.query.branch_themes_id, getThemeDetails])

  useEffect(() => {
    if (themeDetails) {
      setThemeName(themeDetails.theme_name)
    }
  }, [themeDetails])

  if (!themeDetails) {
    return <div></div>
  }

  return (
    <IndexLayout pageName="themesDetails" title="密室逃脫" background="dark">
      <DetailSection
        Banner={<Banner />}
        Item={<Item />}
        Step={<Step />}
        Calendar={<Calendar />}
      />
      <div className="container">
        <div className="row"></div>
      </div>
    </IndexLayout>
  )
}

export default function ThemeDetails() {
  return (
    <ThemeProvider>
      <ThemeDetailsContent />
    </ThemeProvider>
  )
}
