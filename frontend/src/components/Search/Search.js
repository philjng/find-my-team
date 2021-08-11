import {Card, Container, Grid} from "@material-ui/core";
import {searchUsers, searchGroups, searchEvents} from "../../actions/search";
import {connect} from "react-redux";
import React, {useState} from "react";
import EventSearchBox from "../Events/EventSearchBox";
import GroupSearchBox from "../Groups/GroupSearchBox";
import UserSearchBox from "../Profile/UserSearchBox";
import {styled} from "@material-ui/styles";
import {SCButtonGroup} from "../Events/EventsContainer";
import Button from "@material-ui/core/Button";

const ButtonContainer = styled(Card)({
  backgroundColor: `#f7fdfc`,
  width: `fit-content`,
  margin: `2rem auto`,
  padding: `0.5rem`
})

function Search(props) {
  const {
    eventSearchResults,
    groupSearchResults,
    userSearchResults,
  } = props;

  const [filter, setFilter] = useState("events");

  return (
    <Container>
        <ButtonContainer>
          <SCButtonGroup
            variant="text"
            aria-label="contained primary button group"
          >
            <Button
              onClick={() => setFilter("events")}
              variant={filter === "events" ? "contained" : ""}
              color={filter === "events" ? "default" : ""}
              disableElevation
            >
              Events
            </Button>
            <Button
              onClick={() => setFilter("groups")}
              variant={filter === "groups" ? "contained" : ""}
              color={filter === "groups" ? "default" : ""}
              disableElevation
            >
              Groups
            </Button>
            <Button
              onClick={() => setFilter("users")}
              variant={filter === "users" ? "contained" : ""}
              color={filter === "users" ? "default" : ""}
              disableElevation
            >
              Users
            </Button>
          </SCButtonGroup>
        </ButtonContainer>
        {filter === "events" ?
          <EventSearchBox eventSearchResults={eventSearchResults}/>
          : filter === "groups" ?
            <GroupSearchBox groupSearchResults={groupSearchResults}/>
            : <UserSearchBox userSearchResults={userSearchResults}/>}
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
