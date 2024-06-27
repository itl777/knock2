import { useState } from 'react'
import { teamsData } from '@/data/teams/kk-teams.js'
import TeamItem from './teamitem'

export default function TeamList() {
  const initState = teamsData.map((v, i) => {
    return { ...v }
  })

  const [teams, setTeams] = useState(initState)
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
