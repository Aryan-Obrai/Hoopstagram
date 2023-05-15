import "./LandingGraphic.css";

function LandingGraphic() {
  return (
    <div id="main">
      <div id="main-text">
        <h1>All Things</h1>
        <img id="NBA-logo" src="NBA-logo.png" alt="NBA logo"></img>
        <div id="main-p">
          <p>Keep up with the latest NBA hot</p>
          <p>topics, hype, and moments 🔥</p>
        </div>
        <h3>All-Time Fandom</h3>
        <div id="main-btns">
          <button id="signup-btn">Sign me up! 🚀</button>
          <button id="login-btn">Already have an account? 🏀</button>
        </div>
      </div>
      <img id="NBA-graphic" src="NBA-graphic.png" alt="NBA graphic"></img>
    </div>
  );
}

export default LandingGraphic;
