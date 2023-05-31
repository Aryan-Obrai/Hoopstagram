import "./PickTeams.css";
import TeamCard from "../../components/TeamCard";
import { useEffect, useState } from "react";

function PickTeams() {
  const teams = [
    "Atlanta Hawks ",
    "Boston Celtics ",
    "Brooklyn Nets",
    "Charlotte Hornets ",
    "Chicago Bulls ",
    "Cleveland Cavaliers ",
    "Dallas Mavericks ",
    "Denver Nuggets ",
    "Detroit Pistons ",
    "Golden State Warriors ",
    "Houston Rockets ",
    "Indiana Pacers ",
    "Los Angeles Clippers ",
    "Los Angeles Lakers ",
    "Memphis Grizzlies ",
    "Miami Heat ",
    "Milwaukee Bucks ",
    "Minnesota Timberwolves ",
    "New Orleans Pelicans ",
    "New York Knicks ",
    "Oklahoma City Thunder ",
    "Orlando Magic ",
    "Philadelphia Sixers ",
    "Phoenix Suns ",
    "Portland Trail Blazers ",
    "Sacramento Kings ",
    "San Antonio Spurs ",
    "Toronto Raptors ",
    "Utah Jazz ",
    "Washington Wizards",
  ];

  const [selectedTeams, setSelectedTeams] = useState([]);

  useEffect(() => {
    console.log(selectedTeams);
  });

  return (
    <div id="pick-teams-container">
      <h1 id="pick-teams-heading">Select your favorite teams</h1>
      <div id="pick-teams">
        {teams.map((team) => (
          <TeamCard
            key={team}
            team={team}
            setTeams={setSelectedTeams}
            selectedTeams={selectedTeams}
          />
        ))}
      </div>
      <div id="pick-teams-btns">
        <button id="skip-btn">Skip</button>
        <button id="done-btn">Done</button>
      </div>
    </div>
  );
}

export default PickTeams;
