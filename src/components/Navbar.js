import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <a href="/">
        <img id="logo" src="/logo.png" alt="Hoopstagram logo"></img>
      </a>

      <div id="container">
        <div id="nav-links">
          <a href="/">Feed</a>
          <a href="/">Games</a>
          <a href="/">Teams & Players</a>
        </div>
        <div id="account-btns">
          <button>Sign-up</button>
          <button>Login</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
