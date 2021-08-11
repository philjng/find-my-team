import {
  List,
  ListItem,
  Divider,
  Typography,
} from "@material-ui/core";
import React from "react";
import Group from "./Group";
import {SearchResultsCard} from "../Events/EventSearchBox";
import {CenteredTypography} from "../Events/EventList";

function GroupSearchBox(props) {
  return (
    <SearchResultsCard>
      <Typography variant="h4">Groups</Typography>
      {props.groupSearchResults.length === 0 ? <CenteredTypography>There are no groups.</CenteredTypography>
        :
        <List>
        {props.groupSearchResults.map((group) => (
          <React.Fragment key={group._id}>
            <ListItem>
              <Group group={group} />
            </ListItem>
            <Divider variant="middle" component="li" />
          </React.Fragment>
        ))}
      </List>}
    </SearchResultsCard>
  );
}
export default GroupSearchBox;
