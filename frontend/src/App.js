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
import Search from "./components/Search/Search";
import { useAuth } from "./context/AuthContext";
import {Snackbar} from "@material-ui/core";
import {useSnackbar} from "./components/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

function App() {
  const { currentUser } = useAuth();
  const { handleClose, message, open, severity } = useSnackbar()

  return (
    <div className="App">
      {currentUser && <Navbar />}
      <Snackbar onClose={handleClose} open={open} autoHideDuration={3000} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}>
        <MuiAlert onClose={handleClose} severity={severity} variant="filled">
          {message}
        </MuiAlert>
      </Snackbar>
      <Switch>
        <ProtectedRoute exact path="/events" component={Events} />
        <ProtectedRoute path="/profile/:id" component={Profile} />
        <ProtectedRoute path="/home" component={Home} />
        <ProtectedRoute path="/groups" component={Groups} />
        <ProtectedRoute path="/create" component={Create} />
        <ProtectedRoute path="/create-group" component={CreateGroupPage} />
        <ProtectedRoute path="/groupdetails" component={GroupDetails} />
        <ProtectedRoute path="/eventdetails" component={EventDetails} />
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
