import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Events from "./Events";
import Profile from "./Profile";
import Home from "./Home";
import Groups from "./Groups";
import Create from "./Create";
import GroupDetails from "./GroupDetails";
import EventDetails from "./EventDetails";
import Landing from "./Landing";
import React from "react";

export const Navbar = () => {
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
                        <Login/>
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
    )
}