import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Feed from "./pages/Feed/Feed";
import Games from "./pages/Games/Games";
import TeamsPlayers from "./pages/TeamsPlayers/TeamsPlayers";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/games" element={<Games />} />
        <Route path="/teams+players" element={<TeamsPlayers />} />
      </Routes>
    </div>
  );
}

export default App;
