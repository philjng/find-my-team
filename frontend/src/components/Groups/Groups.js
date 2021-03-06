import UserGroups, { CardHeader } from "./UserGroups";
import {
  Box,
  Card,
  Container,
  Divider,
  List,
  ListItem,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { connect } from "react-redux";
import Group from "./Group";
import { getGroups } from "../../actions/groups";
import { useEffect } from "react";
import { getCreatedGroups, getJoinedGroups } from "../../actions/user";
import { useAuth } from "../../context/AuthContext";

const GroupsPage = styled(Container)({
  display: `flex`,
  justifyContent: `space-between`,
  padding: `2rem 0`,
});

const AllGroups = styled(Card)({
  padding: `1rem`,
  minWidth: `50vw`,
  backgroundColor: `#f7fdfc`,
  marginRight: `1rem`,
});

const GroupsContainer = (props) => {
  const { groups, userGroups, getGroups, getCreatedGroups, getJoinedGroups } =
    props;
  const joinedGroupIds = userGroups.joined.map((group) => group._id);
  const createdGroupIds = userGroups.created.map((group) => group._id);
  const filtered = groups.filter(
    (group) =>
      !(
        joinedGroupIds.includes(group._id) ||
        createdGroupIds.includes(group._id)
      )
  );

  const { currentUser } = useAuth();

  useEffect(() => {
    getGroups();
    getCreatedGroups(currentUser.uid);
    getJoinedGroups(currentUser.uid);
  }, [getGroups, getCreatedGroups, getJoinedGroups, currentUser]);

  return (
    <GroupsPage>
      <AllGroups>
        <CardHeader variant="h4">Public Groups</CardHeader>
        <List disablePadding={true} dense={true}>
          {filtered.map((group) => (
            <Box key={group._id}>
              <ListItem>
                <Group group={group} isMainList={true} />
              </ListItem>
              <Divider variant="middle" component="li" />
            </Box>
          ))}
        </List>
      </AllGroups>
      <UserGroups userGroups={userGroups} />
    </GroupsPage>
  );
};

const mapStateToProps = (state) => {
  return {
    groups: state.groups.groups,
    userGroups: state.user.userGroups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: () => dispatch(getGroups()),
    getCreatedGroups: (id) => dispatch(getCreatedGroups(id)),
    getJoinedGroups: (id) => dispatch(getJoinedGroups(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
