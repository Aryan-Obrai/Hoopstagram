import "./Login.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useState } from "react";

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { setUser } = useContext(UserContext);

  let [errorMsg, setErrorMsg] = useState("");

  function validSubmission() {
    //submission must be not empty
    if (usernameRef.current.value && passwordRef.current.value) {
      return true;
    } else {
      setErrorMsg("Please fill out all fields");
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (validSubmission()) {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }),
      });
      //expected: status code and redirect URL if success, errorMessage if not
      const responseData = await response.json();

      //no existing email or wrong password
      if (responseData.errorMsg) {
        setErrorMsg(responseData.errorMsg);
      } else {
        setUser(responseData.user);
        console.log(responseData);
      }
    }
  }

  return (
    <div>
      <form id="login-form" onSubmit={(e) => handleSubmit(e)}>
        <h1>Welcome back!</h1>
        {errorMsg ? <p className="error-msg">{errorMsg}</p> : ""}
        <label htmlFor="username">Username</label>
        <input
          ref={usernameRef}
          type="text"
          id="username"
          name="username"
        ></input>
        <label htmlFor="text">Password</label>
        <input
          ref={passwordRef}
          type="password"
          id="password"
          name="password"
          autoComplete="off"
        ></input>
        <button id="login-form-btn" type="submit">
          Log in 🏀
        </button>
        <div className="existing-user-prompt">
          <p>Don't have an account? Sign up </p>
          <Link to="/signup" className="here">
            here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
