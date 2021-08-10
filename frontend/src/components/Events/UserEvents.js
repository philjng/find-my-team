import { Grid } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { connect } from "react-redux";
import EventsContainer from "./EventsContainer";
import NextEvent from "./NextEvent";

const EventsGrid = styled(Grid)({
  flexGrow: "1",
});

const UserEvents = (props) => {
  // can potentially just take in EventsContainer to use after refactor
  const { createdEvents, joinedEvents } = props;

  // Find first upcoming event user is participating in
  const currentTime = new Date();
  const upNextEvent = joinedEvents.find(
    (event) => new Date(event.startTime) > currentTime
  );

  return (
    <EventsGrid container item spacing="2" direction="column">
      <Grid item>
        <NextEvent event={upNextEvent} />
      </Grid>
      <Grid item>
        <EventsContainer
          headerValue="Your Created Events"
          events={createdEvents}
        />
      </Grid>
      <Grid item>
        <EventsContainer
          headerValue="Your Joined Events"
          events={joinedEvents}
        />
      </Grid>
    </EventsGrid>
  );
};

const mapStateToProps = (state) => {
  return {
    createdEvents: state.user.userEvents.created,
    joinedEvents: state.user.userEvents.joined,
  };
};

export default connect(mapStateToProps)(UserEvents);
