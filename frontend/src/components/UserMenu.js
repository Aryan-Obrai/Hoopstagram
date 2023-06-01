import "./UserMenu.css";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faUser,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

//custom hook that closes user menu when user clicks anywhere outside of it
function useOutsideUserMenu(ref, setShowMenu) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (
          event.target.id !== "user-menu-btn" &&
          event.target.id !== "profile-pic"
        )
          setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function UserMenu() {
  const { user, setUser } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideUserMenu(wrapperRef, setShowMenu);

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

  function handleClick() {
    setShowMenu(!showMenu);
  }

  return (
    <div id="user-menu-container">
      <button id="user-menu-btn" onClick={() => handleClick()}>
        <img
          id="profile-pic"
          src="/default.png"
          alt="Profile pic"
          width={45}
        ></img>
      </button>
      {showMenu && (
        <ul ref={wrapperRef} id="user-menu">
          <li>
            <Link to="" onClick={() => setShowMenu(false)}>
              <button>
                <FontAwesomeIcon icon={faUser} />
                View Profile
              </button>
            </Link>
          </li>
          <li>
            <Link to="" onClick={() => setShowMenu(false)}>
              <button>
                <FontAwesomeIcon icon={faGear} />
                Profile Settings
              </button>
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => setShowMenu(false)}>
              <button onClick={() => handleLogout()}>
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
