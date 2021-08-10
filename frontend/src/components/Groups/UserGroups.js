import { Card, CardContent, Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { connect } from "react-redux";
import Group from "./Group";
import { useAuth } from "../../context/AuthContext";
import { getCreatedGroups, getJoinedGroups } from "../../actions/user";
import { useEffect } from "react";

const UserGroup = styled(Card)({
  backgroundColor: `#f7fdfc`,
});

export const CardHeader = styled(Typography)({
  marginBottom: `1rem`,
});

const UserGroupsContainer = (props) => {
  const { getCreatedGroups, getJoinedGroups } = props;
  const userId = useAuth().currentUser.uid;

  useEffect(() => {
    getCreatedGroups(userId);
    getJoinedGroups(userId);
  }, [getCreatedGroups, getJoinedGroups, userId]);

  return (
    <UserGroup>
      <CardContent>
        <CardHeader variant="h5">Your Groups</CardHeader>
        <Typography variant="h6">Groups you own</Typography>
        {props.userGroups.created.length === 0 && (
          <Typography>You do not own any groups.</Typography>
        )}
        {props.userGroups.created.map((group) => (
          <Group
            group={group}
            isMainList={false}
            key={group.name + group.creatorId}
          />
        ))}
        <Typography variant="h6">Groups you joined</Typography>
        {props.userGroups.joined.length === 0 && (
          <Typography>You are not currently in any groups!</Typography>
        )}
        {props.userGroups.joined.map((group) => (
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

const mapStateToProps = (state) => ({ userGroups: state.user.userGroups });

export default connect(mapStateToProps, { getCreatedGroups, getJoinedGroups })(
  UserGroupsContainer
);
