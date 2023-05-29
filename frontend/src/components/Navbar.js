import "./Navbar.css";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

function Navbar() {
  const { user } = useContext(UserContext);

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
            <Link to="/teams+players">Teams & Players</Link>
          </li>
        </ul>

        {user ? (
          <div id="account-btns">
            <Link to="/">
              <button>Logout</button>
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
