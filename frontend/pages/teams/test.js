import React from 'react'
import IndexLayout from '@/components/layout'
import styles from './teams.module.css'
import TeamList from '@/components/page-components/teams/teamlist'

export default function TeamListTest() {
  return (
    <>
      <IndexLayout title="糾團">
        <div>
          <h2>糾團頁面</h2>
        </div>
        <div className={styles.teamsPage}>
          <TeamList />
        </div>
      </IndexLayout>
    </>
  )
}
