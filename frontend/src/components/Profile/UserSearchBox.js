import {
  List,
  ListItem,
  Divider,
  Typography,
} from "@material-ui/core";
import React from "react";
import UserListing from "./UserListing";
import {SearchResultsCard} from "../Events/EventSearchBox";

function UserSearchBox(props) {
  return (
    <SearchResultsCard>
      <Typography variant="h4">People</Typography>
      <List>
        {props.userSearchResults.map((user) => (
          <React.Fragment key={user._id}>
            <ListItem>
              <UserListing user={user} />
            </ListItem>
            <Divider variant="middle" component="li" />
          </React.Fragment>
        ))}
      </List>
    </SearchResultsCard>
  );
}
export default UserSearchBox;
