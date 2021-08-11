import {
  Card,
  Typography,
} from "@material-ui/core";
import React from "react";
import {styled} from "@material-ui/styles";
import {EventList} from "./EventList";

export const SearchResultsCard = styled(Card)({
  backgroundColor: `#f7fdfc`,
  margin: `2rem auto`,
  padding: `1rem`
});

function EventSearchBox(props) {
  return (
    <SearchResultsCard>
      <Typography variant="h4">Events</Typography>
      <EventList events={props.eventSearchResults} isEventPage={false}/>
    </SearchResultsCard>
  );
}
export default EventSearchBox;
