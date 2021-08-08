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

const TabButton = styled(Button)({
  "&:focus": {
    background: "#d3d3d3" // the background button color
  }
})

const SCContainer = styled(Container)({
  textAlign: "center",
});

function EventsContainer(props) {
  const [filter, setFilter] = useState("upcoming");
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
      </Box>
    </SCContainer>
  );
}


export default EventsContainer;
