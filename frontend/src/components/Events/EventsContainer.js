import Event from "./Event.js";
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

export const Box1 = styled(Box)({
  // border: "2px solid black",
  // borderRadius: "4px",
});

const SCContainer = styled(Container)({
  textAlign: "center",
});

function EventsContainer(props) {
  const [filter, setFilter] = useState("all");
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
      <Box1>
        <ButtonGroup variant="text" aria-label="contained primary button group">
          <Button onClick={() => setFilter("all")}>All</Button>
          <Button onClick={() => setFilter("upcoming")}>Upcoming</Button>
        </ButtonGroup>
        <List
          disablePadding={true}
          dense={true}
          style={{ maxHeight: "50%", overflow: "auto" }}
        >
          {filterEvents(props.events, filter).map((event) => (
            <React.Fragment key={event._id}>
              <ListItem>
                <Event info={event}/>
              </ListItem>
              <Divider variant="middle" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Box1>
    </SCContainer>
  );
}


export default EventsContainer;
