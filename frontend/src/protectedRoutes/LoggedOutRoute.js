import { Navigate } from "react-router-dom";

//prevents logged in users from accessing sign-up/login forms again
const LoggedOutRoute = ({ user, children }) => {
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default LoggedOutRoute;
