import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
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
        <div id="account-btns">
          <button>Sign-up</button>
          <button>Login</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
