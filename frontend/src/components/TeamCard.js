import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./TeamCard.css";

function TeamCard(props) {
  const { team, setTeams, selectedTeams } = props;
  const teamName = team.trim().split(" ");

  const teamFormatted = teamName[teamName.length - 1].toLowerCase();

  const imgURL = "/logos/" + teamFormatted + ".png";

  const altText = team + " Logo";

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

  const [selected, setSelected] = useState(true);
  const [cardStyle, setCardStyle] = useState("team-card");
  const [checkStyle, setCheckStyle] = useState("check");

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);

    if (selected === true) {
      setTeams([...selectedTeams, team]);
      setCardStyle("team-card selected");
      setCheckStyle("check checked");
    } else {
      setCardStyle("team-card");
      setCheckStyle("check");
      const removeTeamSelected = selectedTeams.filter(
        (currentTeam) => currentTeam !== team
      );
      setTeams(removeTeamSelected);
    }
  }

  return (
    <button className={cardStyle} onClick={() => handleClick()}>
      <FontAwesomeIcon icon={faCheck} className={checkStyle} />
      <img src={imgURL} alt={altText} style={setWidth}></img>
      <h1>{team}</h1>
    </button>
  );
}

export default TeamCard;
