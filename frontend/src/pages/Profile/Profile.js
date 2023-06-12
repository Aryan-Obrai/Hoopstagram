import "./Profile.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import TeamCard from "../../components/TeamCard";

function Profile(props) {
  const { user } = useContext(UserContext);
  let profileUser;

  if (props.profile === "this") {
    profileUser = user;
  } else {
    //fetch the given username's profile info
  }

  return (
    <div id="profile-container">
      <div id="profile-header">
        <img
          id="profile-pic"
          src="/default.png"
          alt="Profile pic"
          width={75}
        ></img>
        <h1>{profileUser.username}</h1>
      </div>
      <h2>Favorite Teams</h2>
      <div id="favorite-teams-container">
        {profileUser.favoriteTeams.map((team) => (
          <TeamCard key={team} team={team} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
