import {Link} from "react-router-dom";

import React from "react";
import styled from "styled-components"
import {DropdownAdd} from "./DropdownAdd";

import DropdownProfile from "./DropdownProfile";

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
                        <NavLink to = "/home"><h3>FindMyTeam</h3></NavLink>
                        <NavLink to = "/events">All Events</NavLink>
                        <NavLink to = "/groups">Groups</NavLink>
                    </Links>
                    <Icons>
                        <DropdownAdd/>
                        <DropdownProfile/>
                    </Icons>
                </Nav>

            </div>

    )
}