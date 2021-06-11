import React from 'react';
import {Navbar} from "./components/Navbar";
import {Switch} from "react-router-dom";
import ProtectedRoute from "./ProtectRoute";
import Signup from "./components/Signup";
import Events from "./components/Events/Events";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Groups from "./components/Groups";
import Create from "./components/Create";
import GroupDetails from "./components/GroupDetails";
import EventDetails from "./components/Events/EventDetails";
import LoginRoute from "./LoginRoute";
import LoginPage from "./components/Login/LoginPage";


function App() {
  return (
      <div className="App">
        <Navbar />
        <Switch>
          <ProtectedRoute path="/signup" component={Signup} />
          <ProtectedRoute path="/events" component={Events} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/home" component={Home} />
          <ProtectedRoute path="/groups" component={Groups} />
          <ProtectedRoute path="/create" component={Create} />
          <ProtectedRoute path="/groupdetails" component={GroupDetails} />
          <ProtectedRoute path="/eventdetails" component={EventDetails} />
          <LoginRoute path="/" component={LoginPage} />
        </Switch>
      </div>
  );
}
export default App;