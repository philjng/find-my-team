import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import Create from "./Create.js";
import EventDetails from "./Events/EventDetails.js";
import Events from "./Events/Events.js";
import GroupDetails from "./GroupDetails.js";
import Groups from "./Groups.js";
import Landing from "./Landing.js";
import LoginPage from "./Login/LoginPage.js";
import Profile from "./Profile.js";
import Signup from "./Signup.js";
import Home from "./Home.js";
import LoginRoute from "../LoginRoute.js";
import ProtectedRoute from "../ProtectRoute.js";

//Followed React Router quick-start tutorial at https://reactrouter.com/web/guides/quick-start
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Landing</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/groups">Groups</Link>
            </li>
            <li>
              <Link to="/create">Create Events or Groups</Link>
            </li>
            <li>
              <Link to="/groupdetails">Group Details</Link>
            </li>
            <li>
              <Link to="/eventdetails">Event Details</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <LoginRoute path="/login" component={LoginPage} />
          <ProtectedRoute path="/signup" component={Signup} />
          <ProtectedRoute path="/events" component={Events} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/home" component={Home} />
          <ProtectedRoute path="/groups" component={Groups} />
          <ProtectedRoute path="/create" component={Create} />
          <ProtectedRoute path="/groupdetails" component={GroupDetails} />
          <ProtectedRoute path="/eventdetails" component={EventDetails} />
          <ProtectedRoute path="/" component={Landing} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
