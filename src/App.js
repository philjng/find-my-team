
import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Create from './components/Create.js';
import EventDetails from './components/EventDetails.js';
import Events from './components/Events.js';
import GroupDetails from './components/GroupDetails.js';
import Groups from './components/Groups.js';
import Landing from './components/Landing.js';
import Login from './components/Login.js';
import Profile from './components/Profile.js';
import Signup from './components/Signup.js';
import Home from './components/Home.js';
import {Navbar} from "./components/Navbar";



//Followed React Router quick-start tutorial at https://reactrouter.com/web/guides/quick-start
function App() {
  return (
      <Navbar />
  );
}
export default App;