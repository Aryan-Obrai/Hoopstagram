import "./UserMenu.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faUser,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

function UserMenu() {
  const { user, setUser } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);

  async function handleLogout() {
    const response = await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 200) {
      setUser(null);
    }
  }
  return (
    <div id="user-menu-container">
      <button id="user-menu-btn" onClick={() => setShowMenu(!showMenu)}>
        <img src="/default.png" alt="Profile pic" width={45}></img>
      </button>
      {showMenu && (
        <ul id="user-menu">
          <li>
            <Link to="">
              <button>
                {" "}
                <FontAwesomeIcon icon={faUser} />
                View Profile
              </button>
            </Link>
          </li>
          <li>
            <Link to="">
              <button>
                {" "}
                <FontAwesomeIcon icon={faGear} />
                Profile Settings
              </button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <button onClick={() => handleLogout()}>
                {" "}
                <FontAwesomeIcon icon={faRightFromBracket} />
                Logout
              </button>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
export default UserMenu;
