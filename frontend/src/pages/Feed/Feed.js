import "./Feed.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

function Feed() {
  const textRef = useRef();
  const titleRef = useRef();
  const navigate = useNavigate();

  let [errorMsg, setErrorMsg] = useState("");
  function validSubmission() {
    //submission must be not empty
    console.log(textRef.current.value)
    console.log(titleRef.current.value)
    if (textRef.current.value && titleRef.current.value) 
    {
      return true;
    } else {
      setErrorMsg("Write some text before submitting!");
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (validSubmission()) {
      const response = await fetch("http://localhost:5000/post/create", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify({
          title: textRef.current.value,
          text: textRef.current.value,
        }),
      });
      const responseData = await response.json();

      //error
      if (responseData.errorMsg) {
        setErrorMsg(responseData.errorMsg);
        navigate("/login")
      }
      //receives user info and sets user context for app
      else
      {
        window.location.reload() // maybe send to post page
      }
    }
  }

  return (
    <div>
      <form id="post-form" onSubmit={(e) => handleSubmit(e)}>
        {errorMsg ? <p className="error-msg">{errorMsg}</p> : ""}
        <label htmlFor="title">Title</label>
        <input
          maxLength={20}
          ref={titleRef}
          placeholder="Enter a title..."
          type="text"
          id="title"
          name="title"
        ></input>
        <label htmlFor="text">Post Text</label>
        <textarea
          ref={textRef}
          maxLength={1000}
          placeholder="Post about anything..." 
          rows="6" 
          cols="100"
          type="text"
          id="text"
          name="text"
        ></textarea>
        <button id="post-form-btn" type="submit">
          Post
        </button>
      </form>
    </div>
  )
}

export default Feed;

