import "./TeamsPlayers.css";
import TeamCard from "../../components/TeamCard";
import { teams } from "../../components/teamList";
import { useEffect, useState } from "react";

function TeamsPlayers() {
  //teamView is set when a TeamCard is clicked on
  const [teamView, setTeamView] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/user/teams_players", {
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
    </div>
  );
}

export default TeamsPlayers;
