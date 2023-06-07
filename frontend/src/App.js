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
import Profile from "./pages/Profile/Profile";
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings";
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

      try {
        const result = await response.json();
        return result;
      } catch (error) {
        //return null if no response available
        //204 No Content because no user is signed in
        return null;
      }
    };

    if (!user) {
      fetchData()
        .then((data) => {
          //only set user if an actual user is returned
          if (data) {
            setUser(data.user);
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
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/games" element={<Games />} />
          <Route path="/teams_players" element={<TeamsPlayers />} />
          {/* Auth Pages */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Profile Settings Pages */}
          <Route path="/profile_settings" element={<ProfileSettings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pick_teams" element={<PickTeams />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
