import {Container, List, ListItem, Divider, Typography} from "@material-ui/core";
import React from "react";
import Event from "./Event";

function EventSearchBox(props) {
    return (
    <Container>
                <Typography variant="h5">Events</Typography>
                <List>
                {props.eventSearchResults.map((event) => (
                    <React.Fragment key={event._id}>
                    <ListItem>
                      <Event info={event}/>
                    </ListItem>
                    <Divider variant="middle" component="li" />
                  </React.Fragment>
                ))}
                </List>
            </Container>
    )

}
export default EventSearchBox;