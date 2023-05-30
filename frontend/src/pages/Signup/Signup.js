import "./Signup.css";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

function Signup() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  let [errorMsg, setErrorMsg] = useState("");

  function validSubmission() {
    //submission must be not empty
    if (
      usernameRef.current.value &&
      emailRef.current.value &&
      passwordRef.current.value
    ) {
      return true;
    } else {
      setErrorMsg("Please fill out all fields");
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (validSubmission()) {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });
      //expected: status code and redirect URL if success, errorMessage if not
      const responseData = await response.json();

      //email already taken
      if (responseData.errorMsg) {
        setErrorMsg(responseData.errorMsg);
      }

      //FIXME: Response for successful sign up
    }
  }

  return (
    <div>
      <form id="signup-form" onSubmit={(e) => handleSubmit(e)}>
        <h1>Welcome!</h1>
        {errorMsg ? <p className="error-msg">{errorMsg}</p> : ""}
        <label htmlFor="username">Username</label>
        <input
          ref={usernameRef}
          type="text"
          id="username"
          name="username"
          autoComplete="off"
        ></input>

        <label htmlFor="email">Email</label>

        <input ref={emailRef} type="email" id="email" name="email"></input>
        <label htmlFor="text">Password</label>
        <input
          ref={passwordRef}
          type="password"
          id="password"
          name="password"
          autoComplete="off"
        ></input>
        <button id="signup-form-btn" type="submit">
          Sign up 🚀
        </button>
        <div className="existing-user-prompt">
          <p>Already have an account? Login </p>
          <Link to="/login" className="here">
            here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
