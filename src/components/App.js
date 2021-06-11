
import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Create from './Create.js';
import EventDetails from './Events/EventDetails.js';
import Events from './Events/Events.js';
import GroupDetails from './GroupDetails.js';
import Groups from './Groups.js';
import Landing from './Landing.js';
import LoginPage from './Login/LoginPage.js';
import Profile from './Profile.js';
import Signup from './Signup.js';
import Home from './Home.js';



//Followed React Router quick-start tutorial at https://reactrouter.com/web/guides/quick-start
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to = "/">Landing</Link>
            </li>
            <li>
              <Link to = "/login">Login</Link>
            </li>
            <li>
              <Link to = "/signup">Signup</Link>
            </li>
            <li>
              <Link to = "/events">Events</Link>
            </li>
            <li>
              <Link to = "/profile">Profile</Link>
            </li>
            <li>
              <Link to = "/home">Home</Link>
            </li>
            <li>
              <Link to = "/groups">Groups</Link>
            </li>
            <li>
              <Link to = "/create">Create Events or Groups</Link>
            </li>
            <li>
              <Link to = "/groupdetails">Group Details</Link>
            </li>
            <li>
              <Link to = "/eventdetails">Event Details</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path = "/login">
            <LoginPage />
          </Route>
          <Route path = "/signup">
            <Signup/>
          </Route>
          <Route path = "/events">
            <Events/>
          </Route>
          <Route path = "/profile">
            <Profile/>
          </Route>
          <Route path = "/home">
            <Home/>
          </Route>
          <Route path = "/groups">
            <Groups/>
          </Route>
          <Route path = "/create">
            <Create/>
          </Route>
          <Route path = "/groupdetails">
            <GroupDetails/>
          </Route>
          <Route path = "/eventdetails">
            <EventDetails/>
          </Route>
          <Route path ="/">
            <Landing/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;

/*export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/other">Other</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          
        </Switch>
      </div>
    </Router>
  )
}*/