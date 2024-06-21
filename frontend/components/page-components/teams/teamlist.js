import { useState } from 'react'
import data from '@/data/teams/kk-teams.json'
import TeamItem from './teamitem'

export default function TeamList() {
  const initState = data.map((v, i) => {
    return { ...v }
  })

  const [teams, setTeams] = useState(initState)
  return (
    <>
      {teamData.map((data) => {
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
