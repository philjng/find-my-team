import React from "react";
import { Navbar } from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Events from "./components/Events/Events";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home";
import Groups from "./components/Groups/Groups";
import Create from "./components/Events/CreateEvents";
import GroupDetails from "./components/Groups/GroupDetails";
import EventDetails from "./components/Events/EventDetails";
import LoginRoute from "./LoginRoute";
import LoginPage from "./components/Login/LoginPage";
import SignUpPage from "./components/Login/SignUpPage";
import CreateGroupPage from "./components/Groups/CreateGroup";
import { useAuth } from "./context/AuthContext";

function App() {
  const { currentUser } = useAuth();

  return (
    <div className="App">
      {currentUser && <Navbar />}
      <Switch>
        <ProtectedRoute exact path="/events" component={Events} />
        <ProtectedRoute path="/profile/:id" component={Profile} />
        <ProtectedRoute path="/home" component={Home} />
        <ProtectedRoute exact path="/groups" component={Groups} />
        <ProtectedRoute path="/create" component={Create} />
        <ProtectedRoute path="/create-group" component={CreateGroupPage} />
        <ProtectedRoute exact path="/groups/:id" component={GroupDetails} />
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
