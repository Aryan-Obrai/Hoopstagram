import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <a href="/">
        <img id="logo" src="/logo.png" alt="Hoopstagram logo"></img>
      </a>

      <div id="nav-links">
        <a href="/">Feed</a>
        <a href="/">Games</a>
        <a href="/">Teams & Players</a>
      </div>
    </nav>
  );
}

export default Navbar;
