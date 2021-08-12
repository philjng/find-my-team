import { Card, CardContent, Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { connect } from "react-redux";
import Group from "./Group";

const UserGroup = styled(Card)({
  backgroundColor: `#f7fdfc`,
});

export const CardHeader = styled(Typography)({
  marginBottom: `1rem`,
});

const UserGroupsContainer = (props) => {
  const { title, userGroups } = props;

  return (
    <UserGroup>
      <CardContent>
        <CardHeader variant="h5">{title ? title : "Your Groups"}</CardHeader>
        <Typography variant="h6">Groups you own</Typography>
        {userGroups.created.length === 0 && (
          <Typography>You do not own any groups.</Typography>
        )}
        {userGroups.created.map((group) => (
          <Group
            group={group}
            isMainList={false}
            key={group.name + group.creatorId}
          />
        ))}
        <Typography variant="h6">Groups you joined</Typography>
        {userGroups.joined.length === 0 && (
          <Typography>You are not currently in any groups!</Typography>
        )}
        {userGroups.joined.map((group) => (
          <Group
            group={group}
            isMainList={false}
            key={group.name + group.creatorId}
          />
        ))}
      </CardContent>
    </UserGroup>
  );
};

export default connect(null, null)(UserGroupsContainer);
