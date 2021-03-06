import React from "react";
import { Navbar } from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Events from "./components/Events/Events";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home";
import Groups from "./components/Groups/Groups";
import CreateEvents from "./components/Events/CreateEvents";
import GroupDetails from "./components/Groups/GroupDetails";
import EventDetails from "./components/Events/EventDetails";
import LoginRoute from "./LoginRoute";
import LoginPage from "./components/Login/LoginPage";
import SignUpPage from "./components/Login/SignUpPage";
import CreateGroupPage from "./components/Groups/CreateGroup";
import Search from "./components/Search/Search";
import { useAuth } from "./context/AuthContext";
import SnackbarContainer from "./components/Snackbar/SnackbarContainer";

function App() {
  const { currentUser } = useAuth();

  return (
    <div className="App">
      {currentUser && <Navbar />}
      <SnackbarContainer />
      <Switch>
        <ProtectedRoute exact path="/events" component={Events} />
        <ProtectedRoute path="/profile/:id" component={Profile} />
        <ProtectedRoute path="/home" component={Home} />
        <ProtectedRoute exact path="/groups" component={Groups} />
        <ProtectedRoute path="/create-event" component={CreateEvents} />
        <ProtectedRoute path="/create-group" component={CreateGroupPage} />
        <ProtectedRoute exact path="/groups/:id" component={GroupDetails} />
        <ProtectedRoute path="/search" component={Search} />
        <ProtectedRoute exact path="/events/:id" component={EventDetails} />
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <LoginRoute path="/" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
