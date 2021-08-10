import EventMap from "./EventMap";
import React from "react";
import {useState} from "react";
import {
  Container,
  Button,
  Box,
  ButtonGroup,
} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {EventList} from "./EventList";
import {TabButton} from "../Groups/GroupEvents";

const SCContainer = styled(Container)({
  textAlign: "center",
});

const ButtonGroup1 = styled(ButtonGroup)({
  margin: "3rem",
});

function EventsContainer(props) {
  const [filter, setFilter] = useState("upcoming");
  const [mapView, setMapView] = useState(false);

  const filterEvents = (events, filter) => {
    switch (filter) {
      case "all":
        return events;
      case "upcoming":
        const currentTime = new Date();
        return events.filter(
          (event) => new Date(event.startTime) > currentTime
        );
      default:
        return events;
    }
  };

  return (
    <SCContainer>
      <Box>
        <ButtonGroup variant="text" aria-label="contained primary button group">
          <TabButton autoFocus onClick={() => setFilter("upcoming")}>Upcoming</TabButton>
          <TabButton onClick={() => setFilter("all")}>All</TabButton>
        </ButtonGroup>
        <ButtonGroup1
          variant="text"
          aria-label="contained primary button group"
        >
          <Button onClick={() => setMapView(false)}>List</Button>
          <Button onClick={() => setMapView(true)}>Map</Button>
        </ButtonGroup1>
        {mapView ? <EventMap events={filterEvents(props.events, filter)}/>
          : <EventList events={filterEvents(props.events, filter)} isEventPage={true}/>
        }
      </Box>
    </SCContainer>
  );
}

export default EventsContainer;
