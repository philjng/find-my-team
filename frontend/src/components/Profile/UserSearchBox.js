import {
  Typography,
} from "@material-ui/core";
import React from "react";
import UserSquare from "./UserSquare";
import {SearchResultsCard} from "../Events/EventSearchBox";
import {FlexBox} from "../Groups/GroupDetails";

function UserSearchBox(props) {
  return (
    <SearchResultsCard>
      <Typography variant="h4">People</Typography>
      <FlexBox>
        {props.userSearchResults.map((user) => (
              <UserSquare user={user} key={user._id}/>
        ))}
      </FlexBox>
    </SearchResultsCard>
  );
}
export default UserSearchBox;
