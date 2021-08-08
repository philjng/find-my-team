import EventsContainer from "./EventsContainer.js";
import { Card, CardContent, Container, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getEvents } from "../../actions/events";
import { styled } from "@material-ui/styles";

const EventsCard = styled(Card)({
  backgroundColor: `#f7fdfc`,
  margin: `2rem 0`,
});

function Events(props) {
  const { getEvents } = props;

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <Container>
      <EventsCard>
        <CardContent>
          <Typography variant="h4">Events</Typography>
          <EventsContainer events={props.events} />
        </CardContent>
      </EventsCard>
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
