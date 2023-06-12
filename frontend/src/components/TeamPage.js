import React from "react";
import "./TeamPage.css";

const TeamPage = ({ data }) => {
  if (!data) {
    return null; // Return null or a loading indicator when data is null
  }

  return (
    <div className="team-page">
      <h1>TeamPage</h1>
      <div className="roster">
        <h2>Roster</h2>
        <div className="team-roster">
          {data.roster.map((player) => (
            <div key={player.tid} className="player-box">
              <img className="player-images" src={player.playerIMG} alt="Profile" />
              <div className="player-text">
                <span className="player-name">{player.name}</span>
                <span className="player-jersey"> Jersey Number: {player.jerseyNumber}</span>
                <span className="player-weight"> Weight: {player.weight}lbs</span>
                <span className="player-height"> Height: {player.height}</span>
                <span className="player-position"> Postion: {player.position}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
