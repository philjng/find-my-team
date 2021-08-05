import { TextField, Container, Button, Card } from "@material-ui/core";
import { useState } from "react";
import { searchEvents } from "../../actions/events";
import { searchGroups } from "../../actions/groups";
import { searchUsers } from "../../actions/user";
import { connect } from "react-redux";
import React from "react";
import EventSearchBox from "../Events/EventSearchBox";
import GroupSearchBox from "../Groups/GroupSearchBox";
import UserSearchBox from "../Profile/UserSearchBox";
import { styled } from "@material-ui/styles";

const SearchCard = styled(Card)({
    margin: "auto",
    marginTop: "1rem",
    display: "flex",
    justifyContent: "centre",
    width: "50%",
    backgroundColor: "#d6f5ef"
  });

  const SearchBar = styled(TextField)({
      width: "70%",
      float: "left",
      border: "1px solid black",
      backgroundColor: "white",
      margin: "auto",
      borderRadius: "1rem",
      marginTop: "1rem",
      marginBottom: "1rem",
      padding: "0.25rem"

  })

function Search(props) {
  const [searchText, setSearchText] = useState("Type here");

  const { searchEvents, searchGroups, searchUsers } = props;

  const performSearch = () => {
    searchEvents(searchText);
    searchGroups(searchText);
    searchUsers(searchText);
  };


  return (
    <Container>
      <SearchCard>
        <SearchBar
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps = {{disableUnderline: true}}
        />
        <Button onClick={performSearch}>Search</Button>
      </SearchCard>
      <EventSearchBox eventSearchResults={props.eventSearchResults} />
      <GroupSearchBox groupSearchResults={props.groupSearchResults} />
      <UserSearchBox userSearchResults={props.userSearchResults} />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    eventSearchResults: state.events.searchResults,
    groupSearchResults: state.groups.searchResults,
    userSearchResults: state.user.searchResults,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchEvents: (searchText) => searchEvents(dispatch, searchText),
    searchGroups: (searchText) => searchGroups(dispatch, searchText),
    searchUsers: (searchText) => searchUsers(dispatch, searchText),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
