import "./TeamCard.css";

function TeamCard(props) {
  const { team } = props;
  const teamName = team.trim().split(" ");

  const teamFormatted = teamName[teamName.length - 1].toLowerCase();

  const imgURL = "/logos/" + teamFormatted + ".png";
  console.log(imgURL);

  const altText = team + " Logo";

  let setWidth = { width: "45px" };

  //width is dependent on size of img
  if (teamFormatted === "cavaliers" || teamFormatted === "heat") {
    setWidth = { width: "100px" };
  } else if (teamFormatted === "grizzlies" || teamFormatted === "spurs") {
    setWidth = { width: "70px" };
  } else if (
    teamFormatted === "lakers" ||
    teamFormatted === "pistons" ||
    teamFormatted === "jazz"
  ) {
    setWidth = { width: "60px" };
  }

  return (
    <div className="team-card">
      <img src={imgURL} alt={altText} style={setWidth}></img>
      <h1>{team}</h1>
    </div>
  );
}

export default TeamCard;
