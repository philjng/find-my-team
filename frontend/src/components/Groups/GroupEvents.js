import {Button, ButtonGroup, Card, Typography} from "@material-ui/core";
import {EventList} from "../Events/EventList";
import {VerticalContent} from "./GroupDetails";
import {styled} from "@material-ui/styles";
import React, {useState} from "react";

export const TabButton = styled(Button)({
  "&:focus": {
    background: "#d3d3d3" // the background button color
  }
})

const EventCard = styled(Card)({
  backgroundColor: `#f7fdfc`,
  flexGrow: `2`,
  marginRight: `1rem`,
});

const FilterBar = styled(ButtonGroup)({
  textAlign: "center",
  margin: "0 auto"
})

export const GroupEvents = (props) => {
  const { events } = props;

  const [isUpcoming, setIsUpcoming] = useState(true);

  const filterEvents = (events, isUpcoming) => {
    const currentTime = new Date();
    return isUpcoming ? events.filter((event) => new Date(event.startTime) > currentTime)
      : events.filter((event) => new Date(event.endTime) < currentTime)
  };

  return (
    <EventCard>
      <VerticalContent>
        <Typography variant="h6">Events</Typography>
        <FilterBar variant="text" aria-label="contained primary button group">
          <TabButton autoFocus onClick={() => setIsUpcoming(true)}>Upcoming</TabButton>
          <TabButton onClick={() => setIsUpcoming(false)}>Past Events</TabButton>
        </FilterBar>
        <EventList events={filterEvents(events, isUpcoming)} isEventPage={false}/>
      </VerticalContent>
    </EventCard>
  )
}
