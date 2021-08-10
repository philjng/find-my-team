import EventMap from "./EventMap";
import React from "react";
import { useState } from "react";
import {
  Typography,
  Card,
  Button,
  Grid,
  ButtonGroup,
  Box,
  CardHeader,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { EventList } from "./EventList";

const TabButton = styled(Button)({});

const EventCard = styled(Card)({
  backgroundColor: `#f7fdfc`,
  flexGrow: `2`,
  padding: "1rem 1rem 0rem",
});

const SCButtonGroup = styled(ButtonGroup)({
  margin: "0rem 1.5rem 0rem",
  textAlign: "center",
});

function EventsContainer(props) {
  const [filter, setFilter] = useState("upcoming");
  const [mapView, setMapView] = useState(false);
  const { headerValue, events, isEventPage } = props;

  const filterEvents = (events, filter) => {
    const currentTime = new Date();
    switch (filter) {
      case "past":
        return events.filter(
          (event) => new Date(event.startTime) <= currentTime
        );
      case "upcoming":
        return events.filter(
          (event) => new Date(event.startTime) > currentTime
        );
      default:
        return events;
    }
  };

  return (
    <EventCard>
      <CardHeader title={headerValue ? headerValue : "Events"} />
      <Grid container justify="center">
        <SCButtonGroup
          variant="text"
          aria-label="contained primary button group"
        >
          <TabButton
            onClick={() => setFilter("upcoming")}
            variant={filter === "upcoming" ? "contained" : ""}
            color={filter === "upcoming" ? "primary" : ""}
          >
            Upcoming
          </TabButton>
          <TabButton
            onClick={() => setFilter("past")}
            variant={filter === "past" ? "contained" : ""}
            color={filter === "past" ? "primary" : ""}
          >
            Past
          </TabButton>
        </SCButtonGroup>
        <SCButtonGroup
          variant="text"
          aria-label="contained primary button group"
        >
          <Button
            onClick={() => setMapView(false)}
            variant={!mapView ? "contained" : ""}
            color={!mapView ? "primary" : ""}
          >
            List
          </Button>
          <Button
            onClick={() => setMapView(true)}
            variant={mapView ? "contained" : ""}
            color={mapView ? "primary" : ""}
          >
            Map
          </Button>
        </SCButtonGroup>
      </Grid>
      {mapView ? (
        <EventMap events={filterEvents(events, filter)} />
      ) : (
        <EventList
          events={filterEvents(events, filter)}
          isEventPage={isEventPage}
        />
      )}
    </EventCard>
  );
}

export default EventsContainer;
