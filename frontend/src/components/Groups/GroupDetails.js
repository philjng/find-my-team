import { connect } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { useEffect, useState } from "react";
import {
  deleteGroup,
  addMember,
  removeMember,
  getGroupPageData,
} from "../../actions/groups";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingPage from "../Login/LoadingPage";
import CloudinaryAvatar from "../shared-components/CloudinaryAvatar";

const _ = require("lodash");

export const FlexBox = styled(Box)({
  display: `flex`,
});

export const VerticalContent = styled(CardContent)({
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
});

const GroupPage = styled(Container)({});

const GroupCard = styled(Card)({
  backgroundColor: `#f7fdfc`,
  marginTop: `2rem`,
});

const GroupContent = styled(CardContent)({
  display: `flex`,
  justifyContent: `space-between`,
});

const LeftBox = styled(Box)({
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `space-between`,
});

const Image = styled(CardMedia)({
  width: `50%`,
});

const SecondBox = styled(FlexBox)({
  justifyContent: `space-between`,
  margin: `1rem 0`,
});

const EventCard = styled(Card)({
  backgroundColor: `#f7fdfc`,
  flexGrow: `2`,
  marginRight: `1rem`,
});

const MembersCard = styled(Card)({
  backgroundColor: `#f7fdfc`,
});

const Member = styled(FlexBox)({
  margin: `0.5rem 0`,
});

const Name = styled(Typography)({
  marginLeft: `0.5rem`,
  marginTop: `0.5rem`,
  verticalAlign: `center`,
});

const GroupOption = styled(Button)({
  marginTop: `0.5rem`,
  marginRight: `0.5rem`,
});

function GroupDetails(props) {
  const {
    user,
    group,
    groupMembers,
    getGroupPageData,
    deleteGroup,
    addMember,
    removeMember,
  } = props;
  const history = useHistory();
  const { id } = useParams();

  const isManager = group.creatorId === user.user_id;
  const isMember = group.memberIds?.includes(user.user_id);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getGroupPageData(id);
  }, [id, getGroupPageData]);

  const handleDelete = () => {
    window.confirm(
      "Are you sure you want to delete this group? This action cannot be undone."
    ) &&
      deleteGroup(group._id) &&
      history.goBack();
  };

  const joinGroup = () => {
    addMember(group._id, user.user_id);
  };

  const leaveGroup = () => {
    removeMember(group._id, user.user_id);
  };

  // TODO: might want to abstract parts away and simplify this js file
  return _.isEmpty(group) || _.isEmpty(groupMembers) ? (
    <LoadingPage value="Loading data..." />
  ) : (
    <GroupPage>
      <GroupCard>
        <GroupContent>
          <LeftBox>
            <Box>
              <Typography variant="h4">
                <Box fontWeight="fontWeightBold">{group.name}</Box>
              </Typography>
              <Typography component={"span"}>
                <Box fontWeight="fontWeightLight">
                  {"Managed by " + (isManager ? "You" : group.creator)}
                </Box>
                <Box fontWeight="fontWeightLight">
                  {group.groupSize +
                    (group.groupSize === 1 ? " member" : " members")}
                </Box>
              </Typography>
              {isEditing ? (
                <Box>
                  <GroupOption
                    disableElevation
                    size="small"
                    variant="contained"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </GroupOption>
                  <GroupOption
                    disableElevation
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    Update
                  </GroupOption>
                  <GroupOption
                    disableElevation
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete()}
                  >
                    Delete group
                  </GroupOption>
                </Box>
              ) : (
                <GroupOption
                  disableElevation
                  size="small"
                  variant="contained"
                  onClick={() => {
                    if (isManager) {
                      setIsEditing(true);
                    } else {
                      isMember ? leaveGroup() : joinGroup();
                    }
                  }}
                >
                  {isManager ? "Edit" : isMember ? "Leave Group" : "Join Group"}
                </GroupOption>
              )}
            </Box>
            <Box>
              <Typography variant="h6">Group Description</Typography>
              {group.description}
            </Box>
            <Box>
              <Typography variant="h6">Tags</Typography>
              <Typography>{group.tags.join(", ")}</Typography>
            </Box>
          </LeftBox>
          {/*TODO: images for group*/}
          <Image>
            <img
              src="https://i.ytimg.com/vi/NVuL7mLqT6g/maxresdefault.jpg"
              alt="default"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Image>
        </GroupContent>
      </GroupCard>
      <SecondBox>
        {/*TODO: abstract out event card into it's own component with own fetching*/}
        <EventCard>
          <VerticalContent>
            <Typography variant="h6">Events</Typography>
            {/*TODO: set up group related events listing*/}
            <Typography align="center">This group has no events.</Typography>
          </VerticalContent>
        </EventCard>
        {/*TODO: abstract out members card into it's own component with own fetching*/}
        <MembersCard>
          <VerticalContent>
            <Typography variant="h6">
              {"Members (" + group.groupSize + ")"}
            </Typography>
            {groupMembers.map((groupMember) => (
              <Link to={`/profile/${groupMember._id}`} key={groupMember._id}>
                <Member>
                  <CloudinaryAvatar publicId={groupMember.image} size={40} />
                  <Name align="center">{groupMember.displayName}</Name>
                </Member>
              </Link>
            ))}
          </VerticalContent>
        </MembersCard>
      </SecondBox>
    </GroupPage>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    group: state.groups.group,
    groupMembers: state.groups.groupMembers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroupPageData: (groupId) => dispatch(getGroupPageData(groupId)),
    deleteGroup: (groupId) => dispatch(deleteGroup(groupId)),
    addMember: (groupId, userId) => dispatch(addMember(groupId, userId)),
    removeMember: (groupId, userId) => dispatch(removeMember(groupId, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetails);
