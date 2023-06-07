import "./ProfileInfo.css";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ProfileInput from "./ProfileInput";
import PickTeams from "../../components/PickTeams";

function ProfileInfo() {
  const { user } = useContext(UserContext);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const [showPickTeams, setShowPickTeams] = useState(false);

  const [donePickingTeams, setDonePickingTeams] = useState(false);

  const fields = ["username", "email", "password"];

  //sending corresponding setter in props
  function correspondingSetter(field) {
    if (field === "username") {
      return setUsername;
    } else if (field === "email") {
      return setEmail;
    } else {
      return setPassword;
    }
  }

  //sending corresponding setter in props
  function correspondingState(field) {
    if (field === "username") {
      return username;
    } else if (field === "email") {
      return email;
    } else {
      return password;
    }
  }

  function editButton(e) {
    e.preventDefault();
    setDonePickingTeams(false);
    setShowPickTeams(true);
  }

  //listens for donePickingTeams
  //if it is true remove this component from screen
  useEffect(() => {
    if (donePickingTeams) {
      setShowPickTeams(false);
    }
  }, [donePickingTeams]);

  async function updateInfo(e) {
    e.preventDefault();
    let updatedInfo = {};

    if (username !== user.username) {
      updatedInfo.updatedUsername = username;
    }

    if (email !== user.email) {
      updatedInfo.updatedEmail = email;
    }

    if (password) {
      updatedInfo.password = password;
    }

    console.log(updatedInfo);
  }

  return (
    <div>
      {showPickTeams ? (
        <PickTeams
          doneSelecting={setDonePickingTeams}
          initial={false}
          username={user.username}
          buttonText={"Cancel"}
        />
      ) : (
        ""
      )}
      <form id="profile-info-form">
        <h1>Profile Settings</h1>

        {fields.map((field) => (
          <ProfileInput
            key={field}
            type={field}
            state={correspondingState(field)}
            setter={correspondingSetter(field)}
          />
        ))}

        <div id="fav-teams-container">
          <p>Favorite Teams:</p>
          <button onClick={(e) => editButton(e)}>Edit</button>
        </div>

        <button id="update-btn" onClick={(e) => updateInfo(e)}>
          Update Info 💫
        </button>
      </form>
    </div>
  );
}

export default ProfileInfo;
