export default function TeamItem({
  team_id = 0,
  team_title = `隊名`,
  leader_id = `隊長ID`,
  tour = `行程名稱`,
}) {
  return (
    <>
      <div key={team_id}>
        <p>名稱 {team_title}</p>
        <p>隊長:{leader_id}</p>
        <p>行程:{tour}</p>
      </div>
    </>
  )
}
