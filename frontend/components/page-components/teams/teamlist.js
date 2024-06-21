import data from '@/data/kk-teams.json'
import TeamItem from './teamitem'

export default function TeamList() {
    {data.map((data) => {
        const {team_id, team_title, leader_id, tour} = data
return(    
    <TeamItem
    key={team_id}
    team_title={team_title}
    leader_id={leader_id}
    tour={tour} />
    )
}
    )}}