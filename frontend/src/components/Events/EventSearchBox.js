import {
  Card,
  List,
  ListItem,
  Divider,
  Typography,
} from "@material-ui/core";
import React from "react";
import Event from "./Event";
import {styled} from "@material-ui/styles";

const SearchResultsCard = styled(Card)({
  backgroundColor: `#f7fdfc`,
  margin: `2rem auto`,
  width: `75%`,
});

function EventSearchBox(props) {
  return (
    <SearchResultsCard>
      <Typography variant="h5">Events</Typography>
      <List>
        {props.eventSearchResults.map((event) => (
          <React.Fragment key={event._id}>
            <ListItem>
              <Event info={event} />
            </ListItem>
            <Divider variant="middle" component="li" />
          </React.Fragment>
        ))}
      </List>
    </SearchResultsCard>
  );
}
export default EventSearchBox;
