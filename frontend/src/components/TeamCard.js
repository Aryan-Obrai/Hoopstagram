import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./TeamCard.css";

function TeamCard(props) {
  const { team, setTeams, selectedTeams } = props;

  let { imgURL, altText, teamFormatted } = setImgUrl(team);

  let setWidth = setImgWidth(teamFormatted);

  const [selected, setSelected] = useState(true);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);

    if (selected === true) {
      setTeams([...selectedTeams, team]);
    } else {
      const removeTeamSelected = selectedTeams.filter(
        (currentTeam) => currentTeam !== team
      );
      setTeams(removeTeamSelected);
    }
  }

  return (
    <button
      className={selected ? "team-card" : "team-card selected"}
      onClick={() => handleClick()}
    >
      <FontAwesomeIcon
        icon={faCheck}
        className={selected ? "check" : "check checked"}
      />
      <img src={imgURL} alt={altText} style={setWidth}></img>
      <h1>{team}</h1>
    </button>
  );
}

//HELPER FUNCTIONS

function setImgUrl(team) {
  const teamName = team.trim().split(" ");

  const teamFormatted = teamName[teamName.length - 1].toLowerCase();

  const imgURL = "/logos/" + teamFormatted + ".png";

  const altText = team + " Logo";

  return { imgURL, altText, teamFormatted };
}

function setImgWidth(teamFormatted) {
  let setWidth = { width: "45px" };
  //width is dependent on size of img
  if (teamFormatted === "cavaliers") {
    setWidth = { width: "100px" };
  } else if (teamFormatted === "heat") {
    setWidth = { width: "130px", overflow: "hidden" };
  } else if (teamFormatted === "grizzlies" || teamFormatted === "spurs") {
    setWidth = { width: "70px" };
  } else if (
    teamFormatted === "lakers" ||
    teamFormatted === "pistons" ||
    teamFormatted === "jazz" ||
    teamFormatted === "magic" ||
    teamFormatted === "knicks" ||
    teamFormatted === "hornets" ||
    teamFormatted === "pelicans"
  ) {
    setWidth = { width: "60px" };
  }
  return setWidth;
}

export default TeamCard;
