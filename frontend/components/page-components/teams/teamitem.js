export default function TeamItem({ team_id = 0, team_title = `隊名`, leader_id =`隊長ID`, tour =`行程名稱` }) {
    return (
    <>
        <div key={r.sid}>
            <p>名稱 {r.team_title}</p>
            <p>隊長:{r.leader_id}</p>
            <p>行程:{r.tour}</p>
        </div>
    </>
    )
  }
  
