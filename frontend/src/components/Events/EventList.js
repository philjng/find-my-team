import {Divider, List, ListItem, Typography} from "@material-ui/core";
import React from "react";
import Event from "./Event";


export const EventList = (props) => {
  const {
    events,
    isEventPage
  } = props;


  return events.length === 0 ?
    isEventPage ? (<Typography>"There are no events! Start one yourself!"</Typography>)
      : (<Typography align="center">This group has no events.</Typography>)
    : (<List
      disablePadding={true}
      dense={true}
      style={{maxHeight: "50%", overflow: "auto"}}
    >
      {events.map((event) => (
        <React.Fragment key={event._id}>
          <ListItem>
            <Event info={event}/>
          </ListItem>
          <Divider variant="middle" component="li"/>
        </React.Fragment>
      ))}
    </List>)
}