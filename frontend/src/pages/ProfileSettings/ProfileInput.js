import { useState } from "react";
import "./ProfileInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function ProfileInput(props) {
  const { type, setter, state } = props;
  const [editMode, setEditMode] = useState(false);

  const label = type.charAt(0).toUpperCase() + type.slice(1);

  function toggleEdit(e) {
    e.preventDefault();
    setter(type);
  }

  return (
    <div className="profile-input">
      <label htmlFor={type}>{label}</label>
      <div className="input-and-btn">
        <input
          autoComplete="off"
          id={type}
          name={type}
          value={state}
          onChange={(e) => setter(e.target.value)}
        />
        <button onClick={(e) => toggleEdit(e)} className="profile-input-btn">
          <FontAwesomeIcon icon={faPenToSquare} className="fa-xl" />
        </button>
      </div>
    </div>
  );
}
export default ProfileInput;
