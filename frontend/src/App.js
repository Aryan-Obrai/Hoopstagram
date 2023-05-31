import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Feed from "./pages/Feed/Feed";
import Games from "./pages/Games/Games";
import TeamsPlayers from "./pages/TeamsPlayers/TeamsPlayers";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import PickTeams from "./components/PickTeams";
import { UserContext } from "./contexts/UserContext";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  //persists user on refresh
  //looks at user state
  //if it is null request session user info from server
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/user/account_info", {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      return result;
    };

    if (!user) {
      fetchData()
        .then((data) => {
          //only set user if an actual user is returned
          if (data.user) {
            setUser(data.user);
          } else {
            console.log("404 is expected if no user logged in");
          }
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/games" element={<Games />} />
          <Route path="/teams_players" element={<TeamsPlayers />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pick_teams" element={<PickTeams />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
