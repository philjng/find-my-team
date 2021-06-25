import Event from "./Event.js";
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

const Box1 = styled(Box)({
  border: "2px solid black",
  backgroundColor: "white",
  borderRadius: "4px",
});

const SCContainer = styled(Container)({
  textAlign: "center",
});

function EventsContainer(props) {
  console.log(props.events);
  console.log(props.viewableEvents);
  return (
    <SCContainer className="events_container">
      <Box1>
        <ButtonGroup variant="text" aria-label="contained primary button group">
          <Button onClick={props.all}>All</Button>
          <Button onClick={props.upcoming}>Upcoming</Button>
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
    viewableEvents: state.events.viewableEvents,
  };
};

export default connect(mapStateToProps, {
  upcoming: viewUpcomingEventsOnly,
  all: viewAllEvents,
})(EventsContainer);
