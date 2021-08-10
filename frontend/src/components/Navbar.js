import {Link} from "react-router-dom";

import React from "react";
import styled from "styled-components"
import {DropdownAdd} from "./DropdownAdd";

import DropdownProfile from "./DropdownProfile";
import {Box} from "@material-ui/core";
import {styled as Styled} from "@material-ui/styles" ;
import {SearchBar} from "./Search/SearchBar";

const Sticky = Styled(Box)({
  position: "sticky",
  top: 0,
  zIndex: 99
});

const Nav = styled.nav`
  background-color: #2c698d;
  color: #f7fdfc;
  display: flex;
  justify-content: space-between;
`

const Links = styled.div`
  display: flex;
  align-items: center;
`

const NavLink = styled(Link)`
  color: #fff; 
  text-decoration: none;
  margin: 0 1rem;
`

const Icons = styled.div`
  display: flex;
  align-items: center;
`

export const Navbar = () => {
  return (
    <Sticky>
      <Nav>
        <Links>
          <NavLink to="/home"><h3>FindMyTeam</h3></NavLink>
          <NavLink to="/events">All Events</NavLink>
          <NavLink to="/groups">Groups</NavLink>
          <SearchBar/>
        </Links>
        <Icons>
          <DropdownAdd/>
          <DropdownProfile/>
        </Icons>
      </Nav>
    </Sticky>
  )
}