import { Redirect, Route } from "react-router";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
}

export default ProtectedRoute;
