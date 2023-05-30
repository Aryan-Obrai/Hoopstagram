import "./Feed.css";

function Feed() {
  async function respond() {
    const response = await fetch("http://localhost:5000/feed", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const responseData = await response.json();
    console.log(responseData);
  }

  respond();

  return <div>Feed</div>;
}

export default Feed;
