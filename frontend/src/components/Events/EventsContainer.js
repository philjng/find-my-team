import Event from "./Event.js";

import {useEffect} from 'react';
import { connect } from "react-redux";
import { viewUpcomingEventsOnly, viewAllEvents } from "../../actions/events";
import {
  Container,
  Button,
  List,
  ListItem,
  Box,
  Divider,
  ButtonGroup,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";

let axios = require('axios');

export const Box1 = styled(Box)({
  border: "2px solid black",
  backgroundColor: "white",
  borderRadius: "4px",
});

const SCContainer = styled(Container)({
  textAlign: "center",
});


function EventsContainer(props) {

  const viewAll = () => {
    axios.get(`http://localhost:3001/events`).then( res => {
      props.all(res.data);
    }  
    ).catch((err) => console.log(err))
  }

  const viewUpcoming = () => {
    axios.get(`http://localhost:3001/events`).then( res => {
      props.upcoming(res.data);
    }  
    ).catch((err) => console.log(err))
  }

  useEffect(() => viewAll(), []);
    
  return (
    <SCContainer className="events_container">
      <Box1>
        <ButtonGroup variant="text" aria-label="contained primary button group">
          <Button onClick={viewAll}>All</Button>
          <Button onClick={viewUpcoming}>Upcoming</Button>
        </ButtonGroup>
        <List
          disablePadding={true}
          dense={true}
          style={{ maxHeight: "50%", overflow: "auto" }}
        >
          {props.viewableEvents.map((event) => (
            <>
              <ListItem key={JSON.stringify(event)}>
                <Event info={event} />
              </ListItem>
              <Divider variant="middle" component="li" />
            </>
          ))}
        </List>
      </Box1>
    </SCContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
    viewableEvents: state.events.viewableEvents
  };
};

export default connect(mapStateToProps, {
  upcoming: viewUpcomingEventsOnly,
  all: viewAllEvents,
})(EventsContainer);
