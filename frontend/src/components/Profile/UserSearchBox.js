import {
  Card,
  List,
  ListItem,
  Divider,
  Typography,
} from "@material-ui/core";
import React from "react";
import UserListing from "./UserListing";
import {styled} from "@material-ui/styles";

const SearchResultsCard = styled(Card)({
  backgroundColor: `#d6f5ef`,
  margin: `2rem auto`,
  width: `75%`,
});
function UserSearchBox(props) {
  return (
    <SearchResultsCard>
      <Typography variant="h5">People</Typography>
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
