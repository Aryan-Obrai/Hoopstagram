import "./TeamsPlayers.css";
import TeamCard from "../../components/TeamCard";
import { teams } from "../../components/teamList";

function TeamsPlayers() {
  return (
    <div>
      <div id="teams">
        {Object.keys(teams).map((team) => (
          <TeamCard
            key={team}
            team={team}
            displayOnly={true}
            abbreviated={true}
          />
        ))}
      </div>
    </div>
  );
}

export default TeamsPlayers;
