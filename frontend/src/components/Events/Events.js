import EventsContainer from "./EventsContainer.js";
import { Container, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getEvents } from "../../actions/events";

function Events(props) {
  const { getEvents } = props;

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <Container>
      <Typography variant="h1">Events</Typography>
      <EventsContainer events={props.events} />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: () => getEvents(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
