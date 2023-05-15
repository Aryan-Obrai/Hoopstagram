import "./Home.css";
import Landing from "./Landing";
import FeedDescription from "./FeedDescription";

function Home() {
  return (
    <div>
      <section id="landing">
        <Landing />
      </section>
      <section id="feed-section">
        <FeedDescription />
      </section>
      <section id="games-description"></section>
      <section id="teams-description"></section>
    </div>
  );
}

export default Home;
