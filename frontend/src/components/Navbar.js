import "./Navbar.css";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

function Navbar() {
  const { user, setUser } = useContext(UserContext);

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
    <nav>
      <Link id="logo" to="/">
        <img src="/logo.png" alt="Hoopstagram logo"></img>
      </Link>

      <div id="container">
        <ul id="nav-links">
          <li>
            <Link to="/feed">Feed</Link>
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>

          <li>
            <Link to="/teams_players">Teams & Players</Link>
          </li>
        </ul>

        {user ? (
          <div id="account-btns">
            <Link to="/">
              <button onClick={() => handleLogout()}>Logout</button>
            </Link>
          </div>
        ) : (
          <div id="account-btns">
            <Link to="/signup">
              <button>Sign-up</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
