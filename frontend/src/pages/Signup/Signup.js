import "./Signup.css";
import { Link } from "react-router-dom";

function Signup() {
  function handleSubmit() {
    console.log("submitted");
  }
  return (
    <div>
      <form id="signup-form" onSubmit={handleSubmit}>
        <h1>Welcome!</h1>
        <label htmlFor="fname">First Name</label>
        <input type="text" id="fname" name="fname" autoComplete="off"></input>
        <label htmlFor="lname">Last Name</label>
        <input type="text" id="lname" name="lname" autoComplete="off"></input>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email"></input>
        <label htmlFor="text">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="off"
        ></input>
        <button id="signup-form-btn" type="submit">
          Sign up
        </button>
        <div>
          <p>Already have an account? Login </p>
          <Link to="/login">here</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
