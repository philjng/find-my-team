import EventsContainer from "./EventsContainer.js";
import { Container, Typography } from "@material-ui/core";

function Events() {
  return (
    <Container>
      <Typography variant="h1">Events</Typography>
      <EventsContainer />
    </Container>
  );
}
export default Events;
