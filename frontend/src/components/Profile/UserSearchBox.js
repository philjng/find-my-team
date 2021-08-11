import {
  Typography,
} from "@material-ui/core";
import React from "react";
import UserSquare from "./UserSquare";
import {SearchResultsCard} from "../Events/EventSearchBox";
import {FlexBox} from "../Groups/GroupDetails";
import {CenteredTypography} from "../Events/EventList";

function UserSearchBox(props) {
  return (
    <SearchResultsCard>
      <Typography variant="h4">People</Typography>
      {props.userSearchResults.length === 0 ? <CenteredTypography>There are no users.</CenteredTypography>
        :
      <FlexBox>
        {props.userSearchResults.map((user) => (
              <UserSquare user={user} key={user._id}/>
        ))}
      </FlexBox>}
    </SearchResultsCard>
  );
}
export default UserSearchBox;
