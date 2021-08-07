import { TextField, Container, Button, Card } from "@material-ui/core";
import { useState } from "react";
import { searchUsers, searchGroups, searchEvents } from "../../actions/search";
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
  backgroundColor: "#d6f5ef",
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
  padding: "0.25rem",
});

function Search(props) {
  const [searchText, setSearchText] = useState("");

  const {
    searchEvents,
    searchGroups,
    searchUsers,
    eventSearchResults,
    groupSearchResults,
    userSearchResults,
  } = props;

  const performSearch = () => {
    console.log("performSearch Called");
    searchEvents(searchText);
    searchGroups(searchText);
    searchUsers(searchText);
  };

  return (
    <Container>
      <SearchCard>
        <SearchBar
          value={searchText}
          placeholder="Type here"
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{ disableUnderline: true }}
        />
        <Button onClick={performSearch}>Search</Button>
      </SearchCard>
      <EventSearchBox eventSearchResults={eventSearchResults} />
      <GroupSearchBox groupSearchResults={groupSearchResults} />
      <UserSearchBox userSearchResults={userSearchResults} />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    eventSearchResults: state.search.events,
    groupSearchResults: state.search.groups,
    userSearchResults: state.search.users,
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
