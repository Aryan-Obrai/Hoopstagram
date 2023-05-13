import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <img id="logo" src="/logo.png" alt="Hoopstagram logo"></img>
      <div id="nav-links">
        <a href="/">Feed</a>
        <a href="/">Games</a>
        <a href="/">Teams & Players</a>
      </div>
    </nav>
  );
}

export default Navbar;
