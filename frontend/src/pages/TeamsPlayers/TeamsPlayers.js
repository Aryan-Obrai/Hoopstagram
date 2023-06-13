import "./TeamsPlayers.css";
import TeamCard from "../../components/TeamCard";
import TeamPage from "../../components/TeamPage";
import { teams } from "../../components/teamList";
import { useEffect, useState } from "react";

function TeamsPlayers() {
  //teamView is set when a TeamCard is clicked on
  const [teamView, setTeamView] = useState(0);
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
<<<<<<< HEAD
    fetch("http://localhost:5000/stats/teams_players", {
=======
    setTeamData(null);
    fetch("http://localhost:5000/user/teams_players", {
>>>>>>> 5f28d900e76d598809ede4f99fc442f8501d1640
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ teamID: teamView }),
    })
      .then((res) => res.json())
      .then((data) => {
        //players returned here
        console.log(data);
        setTeamData(data);
      });
  }, [teamView]);

  return (
    <div>
      <div id="teams">
        {Object.keys(teams).map((team) => (
          <TeamCard
            key={team}
            team={team}
            abbreviated={true}
            teamsView={true}
            setTeamView={setTeamView}
          />
        ))}
      </div>
      <div>
      <br></br>
      {teamView !== null && <TeamPage data={teamData}/>}
      </div>
    </div>
  );
}

export default TeamsPlayers;
