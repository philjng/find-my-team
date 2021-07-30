import {TextField, Container, Button} from "@material-ui/core";
import {useState} from "react";
import {searchEvents} from "../../actions/events";
import {searchGroups} from "../../actions/groups";
import { connect } from "react-redux";
import React from "react";
import EventSearchBox from "../Events/EventSearchBox";
// import GroupSearchBox from "../Groups/GroupSearchBox";
function Search(props) {
    const [searchText, setSearchText] = useState("Type here");

    // const { searchEvents, searchGroups } = props;
    const { searchEvents } = props;

    const performSearch = () => {
        console.log("performSearch Called");
        searchEvents(searchText);
        // searchGroups(searchText);
    }

    return (
        <Container>
            <Container>
            <TextField value={searchText} onChange={(e) => setSearchText(e.target.value)}>Search</TextField>
            <Button onClick={performSearch}>Search</Button>
            </Container>
            <EventSearchBox eventSearchResults={props.eventSearchResults}/>
            {/* <GroupSearchBox groupSearchResults={props.groupSearchResults}/> */}
        </Container>
    )
}

const mapStateToProps = (state) => {
    return { eventSearchResults: state.events.searchResults,
            // groupSearchResults: state.groups.searchResults};
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        searchEvents: (searchText) => searchEvents(dispatch, searchText)
        // searchGroups: (searchText) => searchGroups(dispatch, searchText)
    }
}
  export default connect(mapStateToProps, mapDispatchToProps)(Search);