import Event from "./Event.js";
import EventMap from "./EventMap";
import React from "react";
import { useState } from "react";
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

const SCContainer = styled(Container)({
  textAlign: "center",
});

const ButtonGroup1 = styled(ButtonGroup)({
  margin: "3rem",
});

function EventsContainer(props) {
  const [filter, setFilter] = useState("all");
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
    <SCContainer className="events_container">
      <Box>
        <ButtonGroup1
          variant="text"
          aria-label="contained primary button group"
        >
          <Button onClick={() => setFilter("all")}>All</Button>
          <Button onClick={() => setFilter("upcoming")}>Upcoming</Button>
        </ButtonGroup1>
        <ButtonGroup1
          variant="text"
          aria-label="contained primary button group"
        >
          <Button onClick={() => setMapView(false)}>List</Button>
          <Button onClick={() => setMapView(true)}>Map</Button>
        </ButtonGroup1>
        {mapView ? (
          <EventMap events={filterEvents(props.events, filter)} />
        ) : (
          <List
            disablePadding={true}
            dense={true}
            style={{ maxHeight: "50%", overflow: "auto" }}
          >
            {filterEvents(props.events, filter).map((event) => (
              <React.Fragment key={event._id}>
                <ListItem>
                  <Event info={event} />
                </ListItem>
                <Divider variant="middle" component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </SCContainer>
  );
}

export default EventsContainer;
