import "./Profile.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import TeamCard from "../../components/TeamCard";

function Profile() {
  const { user } = useContext(UserContext);

  return (
    <div id="profile-container">
      <div id="profile-header">
        <img
          id="profile-pic"
          src="/default.png"
          alt="Profile pic"
          width={75}
        ></img>
        <h1>{user.username}</h1>
      </div>
      <h2>Favorite Teams</h2>
      <div id="favorite-teams-container">
        {user.favoriteTeams.map((team) => (
          <TeamCard key={team} team={team} displayOnly={true} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
