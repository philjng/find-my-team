import { Container} from "@material-ui/core";
import { searchUsers, searchGroups, searchEvents } from "../../actions/search";
import { connect } from "react-redux";
import React from "react";
import EventSearchBox from "../Events/EventSearchBox";
import GroupSearchBox from "../Groups/GroupSearchBox";
import UserSearchBox from "../Profile/UserSearchBox";
import { styled } from "@material-ui/styles";

function Search(props) {
  const {
    eventSearchResults,
    groupSearchResults,
    userSearchResults,
  } = props;

  return (
    <Container>
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
