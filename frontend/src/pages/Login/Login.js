import "./Login.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault(); //FIXME
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    });
    //expected: status code and redirect URL if success, errorMessage if not
    const responseData = await response.json();
    setUser(responseData.user);
    console.log(responseData.user);
  }

  return (
    <div>
      <form id="login-form" onSubmit={(e) => handleSubmit(e)}>
        <h1>Welcome back!</h1>
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
