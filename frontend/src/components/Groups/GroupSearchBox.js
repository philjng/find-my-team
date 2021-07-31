import {
  Card,
  List,
  ListItem,
  Divider,
  Typography,
} from "@material-ui/core";
import React from "react";
import Group from "./Group";
import {styled} from "@material-ui/styles";


const SearchResultsCard = styled(Card)({
  backgroundColor: `#d6f5ef`,
  margin: `2rem auto`,
  width: `75%`,
});

function GroupSearchBox(props) {
  return (
    <SearchResultsCard>
      <Typography variant="h5">Groups</Typography>
      <List>
        {props.groupSearchResults.map((group) => (
          <React.Fragment key={group._id}>
            <ListItem>
              <Group group={group} />
            </ListItem>
            <Divider variant="middle" component="li" />
          </React.Fragment>
        ))}
      </List>
    </SearchResultsCard>
  );
}
export default GroupSearchBox;
