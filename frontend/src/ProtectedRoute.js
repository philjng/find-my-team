import { Redirect, Route } from "react-router";
import LoadingPage from "./components/Login/LoadingPage";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ component: Component, ...rest }) {
  const { currentUser, loading } = useAuth();

  console.log(loading);
  if (loading) {
    return <LoadingPage />;
  }

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
