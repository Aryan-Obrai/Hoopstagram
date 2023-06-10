import "./PickTeams.css";
import TeamCard from "./TeamCard";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function PickTeams(props) {
  const teams = [
    "Atlanta Hawks ",
    "Boston Celtics ",
    "Brooklyn Nets",
    "Charlotte Hornets ",
    "Chicago Bulls ",
    "Cleveland Cavaliers ",
    "Dallas Mavericks ",
    "Denver Nuggets ",
    "Detroit Pistons ",
    "Golden State Warriors ",
    "Houston Rockets ",
    "Indiana Pacers ",
    "Los Angeles Clippers ",
    "Los Angeles Lakers ",
    "Memphis Grizzlies ",
    "Miami Heat ",
    "Milwaukee Bucks ",
    "Minnesota Timberwolves ",
    "New Orleans Pelicans ",
    "New York Knicks ",
    "Oklahoma City Thunder ",
    "Orlando Magic ",
    "Philadelphia Sixers ",
    "Phoenix Suns ",
    "Portland Trail Blazers ",
    "Sacramento Kings ",
    "San Antonio Spurs ",
    "Toronto Raptors ",
    "Utah Jazz ",
    "Washington Wizards",
  ];

  const { setUser } = useContext(UserContext);

  //lets parent component know user is done picking teams
  const { doneSelecting, initial, buttonText } = props;

  const [selectedTeams, setSelectedTeams] = useState([]);

  //show this component only when doneLoading is true
  const [doneLoading, setDoneLoading] = useState(false);

  //done button is only enabled when user actually has teams picked
  const [enableDoneButton, setEnableDoneButton] = useState(false);

  //loads favorite teams if logged in
  //only triggers on initial load
  useEffect(() => {
    if (!initial) {
      fetch("http://localhost:5000/user/favorite_teams", {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setSelectedTeams(data.teams);
          setDoneLoading(true);
        });
    } else {
      setDoneLoading(true);
    }
  }, []);

  //enable/disable done button if selectedTeams is not empty on sign up
  useEffect(() => {
    if (initial && selectedTeams.length <= 0) {
      setEnableDoneButton(false);
    } else {
      setEnableDoneButton(true);
    }
  }, [selectedTeams, initial]);

  async function done() {
    const response = await fetch("http://localhost:5000/user/pick_teams", {
      method: "PUT",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        teams: selectedTeams,
      }),
    });

    const responseData = await response.json();

    if (responseData.status === true) {
      //update global user context with updated favorite teams
      setUser(responseData.user);
      doneSelecting(true);
    }
  }

  function skip() {
    doneSelecting(true);
  }

  return (
    <div>
      {doneLoading && (
        <div id="pick-teams-container">
          <h1 id="pick-teams-heading">Select your favorite teams</h1>

          <div id="pick-teams">
            {teams.map((team) => (
              <TeamCard
                initial={initial}
                key={team}
                team={team}
                setTeams={setSelectedTeams}
                selectedTeams={selectedTeams}
              />
            ))}
          </div>

          <div id="pick-teams-btns">
            <button className="skip-btn" onClick={() => skip()}>
              {buttonText}
            </button>
            <button
              disabled={!enableDoneButton}
              className="done-btn"
              onClick={() => done()}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PickTeams;
