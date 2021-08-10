import { Divider, List, ListItem, Typography } from "@material-ui/core";
import React from "react";
import Event from "./Event";
import { styled } from "@material-ui/styles";

const CenteredTypography = styled(Typography)({
  textAlign: "center",
  margin: "5rem",
});

export const EventList = (props) => {
  const { events, isEventPage } = props;

  return events.length === 0 ? (
    isEventPage ? (
      <CenteredTypography>
        "There are no events! Start one yourself!"
      </CenteredTypography>
    ) : (
      <CenteredTypography>There are no events.</CenteredTypography>
    )
  ) : (
    <List
      disablePadding={true}
      dense={true}
      style={{ maxHeight: "50%", overflow: "auto" }}
    >
      {events.map((event) => (
        <React.Fragment key={event._id}>
          <ListItem>
            <Event info={event} />
          </ListItem>
          <Divider variant="middle" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};
