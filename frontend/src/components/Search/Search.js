import {TextField, Container, Button} from "@material-ui/core";
import {useState} from "react";
import {searchEvents} from "../../actions/events";
import {searchGroups} from "../../actions/groups";
import {searchUsers} from "../../actions/user";
import { connect } from "react-redux";
import React from "react";
import EventSearchBox from "../Events/EventSearchBox";
import GroupSearchBox from "../Groups/GroupSearchBox";
import UserSearchBox from "../Profile/UserSearchBox";
function Search(props) {
    const [searchText, setSearchText] = useState("Type here");

    const { searchEvents, searchGroups, searchUsers } = props;

    const performSearch = () => {
        console.log("performSearch Called");
        searchEvents(searchText);
        searchGroups(searchText);
        searchUsers(searchText);
    }

    return (
        <Container>
            <Container>
            <TextField value={searchText} onChange={(e) => setSearchText(e.target.value)}>Search</TextField>
            <Button onClick={performSearch}>Search</Button>
            </Container>
            <EventSearchBox eventSearchResults={props.eventSearchResults}/>
            <GroupSearchBox groupSearchResults={props.groupSearchResults}/>
            <UserSearchBox userSearchResults={props.userSearchResults}/>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return { eventSearchResults: state.events.searchResults,
            groupSearchResults: state.groups.searchResults,
            userSearchResults: state.user.searchResults
        };
    };

const mapDispatchToProps = (dispatch) => {
    return {
        searchEvents: (searchText) => searchEvents(dispatch, searchText),
        searchGroups: (searchText) => searchGroups(dispatch, searchText),
        searchUsers: (searchText) => searchUsers(dispatch, searchText)
    }
}
  export default connect(mapStateToProps, mapDispatchToProps)(Search);