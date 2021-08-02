import UserGroups, { CardHeader } from "./UserGroups";
import { Card, Container } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { connect } from "react-redux";
import Group from "./Group";
import { getGroups } from "../../actions/groups";
import { useEffect } from "react";

const GroupsPage = styled(Container)({
  display: `flex`,
  justifyContent: `space-between`,
  padding: `2rem 0`,
})

const AllGroups = styled(Card)({
  padding: `1rem`,
  minWidth: `50vw`,
  backgroundColor: `#f7fdfc`
})

const GroupsContainer = (props) => {
  const { getGroups } = props;
  const joinedGroupIds = props.userGroups.joined.map((group) => group._id);
  const createdGroupIds = props.userGroups.created.map((group) => group._id);
  const filtered = props.groups.filter(
    (group) =>
      !(
        joinedGroupIds.includes(group._id) ||
        createdGroupIds.includes(group._id)
      )
  );

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  return (
    <GroupsPage>
      <AllGroups>
        <CardHeader variant="h4">Public Groups</CardHeader>
        {filtered.map((group) => (
          <Group group={group} key={group._id} />
        ))}
      </AllGroups>
      <UserGroups />
    </GroupsPage>
  );
};

const mapStateToProps = (state) => {
  return {
    groups: state.groups.groups,
    userGroups: state.user.userGroups,
  };
};

export default connect(mapStateToProps, { getGroups })(GroupsContainer);
