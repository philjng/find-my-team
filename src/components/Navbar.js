import {Link, Route, Switch} from "react-router-dom";
import Signup from "./Signup";
import Events from "./Events/Events";
import Profile from "./Profile";
import Home from "./Home";
import Groups from "./Groups";
import Create from "./Create";
import React from "react";
import LoginPage from "./Login/LoginPage";
import styled from "styled-components"
import {DropdownAdd} from "./DropdownAdd";
import {DropdownProfile} from "./DropdownProfile";

const Nav = styled.nav`
  background-color: #3f51b5;
  color: #fff;
  display: flex;
  justify-content: space-between;
`

const Links = styled.div`
  display: flex;
  align-items: center;
`

const NavLink = styled(Link)`
  color: #fff;  // will want to remove pure black and white later
  text-decoration: none;
  margin: 0 1rem;
`

const Icons = styled.div`
  display: flex;
  align-items: center;
`

//Followed React Router quick-start tutorial at https://reactrouter.com/web/guides/quick-start
export const Navbar = () => {
    return (
            <div>
                <Nav>
                    <Links>
                        <NavLink to = "/home"><h3>Find My Team</h3></NavLink>
                        <NavLink to = "/events">All Events</NavLink>
                        <NavLink to = "/groups">Groups</NavLink>
                    </Links>
                    <Icons>
                        <DropdownAdd/>
                        <DropdownProfile/>
                    </Icons>
                </Nav>
                <Switch>
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
                    <Route path = "/">
                        <LoginPage/>
                    </Route>
                </Switch>
            </div>

    )
}