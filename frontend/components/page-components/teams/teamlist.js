import React, { useEffect, useState } from 'react'
import { teamsData } from '@/data/teams/kk-teams.js'
import TeamItem from './teamitem'

import { TEAM_LIST } from '@/configs/team-api-path'

export default function TeamList() {
  const [data, setData] = useState({
    success: false,
    rows: [],
  })

  useEffect(() => {
    fetch(`${TEAM_LIST}`)
      .then((r) => r.json())
      .then((myData) => {
        console.log(data)
        setData(myData)
      })
  }, [])

  return (
    <>
      {teamsData.map((p) => {
        const { team_id, team_title, leader_id, tour } = data
        data,
          (
            <TeamItem
              key={team_id}
              team_title={team_title}
              leader_id={leader_id}
              tour={tour}
            />
          )
      })}
    </>
  )
}
