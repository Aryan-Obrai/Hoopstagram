import "./ProfileSettings.css";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ProfileInput from "./ProfileInput";

function ProfileSettings() {
  const { user } = useContext(UserContext);

  const [username, setUsername] = useState("user.username");
  const [email, setEmail] = useState("user.email");
  const [password, setPassword] = useState("");

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

  useEffect(() => console.log(username + " " + email + " " + password));

  return (
    <form id="profile-settings-form">
      <h1>Profile Settings</h1>
      {fields.map((field) => (
        <ProfileInput
          key={field}
          type={field}
          state={correspondingState(field)}
          setter={correspondingSetter(field)}
        />
      ))}
    </form>
  );
}

export default ProfileSettings;
