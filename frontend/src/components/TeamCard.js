import "./TeamCard.css";

function TeamCard(props) {
  const { team } = props;
  const teamName = team.trim().split(" ");

  const imgURL =
    "/logos/" + teamName[teamName.length - 1].toLowerCase() + ".png";
  console.log(imgURL);

  const altText = team + " Logo";

  return (
    <div className="team-card">
      <img src={imgURL} alt={altText}></img>
      <h1>{team}</h1>
    </div>
  );
}

export default TeamCard;
