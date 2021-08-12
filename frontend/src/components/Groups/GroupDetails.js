import {connect} from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {useEffect} from "react";
import {
  addMember,
  removeMember,
  getGroupPageData,
} from "../../actions/groups";
import {Link, useParams} from "react-router-dom";
import LoadingPage from "../Login/LoadingPage";
import TagChips from "../Events/TagChips";
import CloudinaryAvatar from "../shared-components/CloudinaryAvatar";
import EventsContainer from "../Events/EventsContainer";
import {setModalOpen} from "../../actions/modal";
import EditGroupModal from "./EditGroupModal";

const _ = require("lodash");

export const FlexBox = styled(Box)({
  display: `flex`,
});

export const VerticalContent = styled(CardContent)({
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
});

const GroupPageGrid = styled(Grid)({
  marginTop: "2rem",
});

const GroupGrid = styled(Grid)({});

const GroupCard = styled(Card)({
  backgroundColor: "#f7fdfc"
})

const SecondGrid = styled(Grid)({});

const EventsGrid = styled(Grid)({
  flexGrow: "1",
});

const MembersGrid = styled(Grid)({});

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
    groupEvents,
    getGroupPageData,
    addMember,
    removeMember,
    setModalOpen
  } = props;
  const {id} = useParams();

  const isManager = group.creatorId === user.user_id;
  const isMember = group.memberIds?.includes(user.user_id);

  useEffect(() => {
    getGroupPageData(id);
  }, [id, getGroupPageData]);

  const joinGroup = () => {
    addMember(group._id, user.user_id);
  };

  const leaveGroup = () => {
    window.confirm("Are you sure you want to leave this group?") &&
    removeMember(group._id, user.user_id);
  };

  return _.isEmpty(group) || _.isEmpty(groupMembers) ? (
    <LoadingPage value="Loading data..."/>
  ) : (
    <Container>
      <EditGroupModal />
      <GroupPageGrid
        container
        direction="column"
        spacing="2"
        justifyContent="center"
      >
        <GroupGrid container item>
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
                  <GroupOption
                    disableElevation
                    size="small"
                    variant="contained"
                    onClick={() => {
                      if (isManager) {
                        setModalOpen(true);
                      } else {
                        isMember ? leaveGroup() : joinGroup();
                      }
                    }}
                  >
                    {isManager
                      ? "Edit"
                      : isMember
                        ? "Leave Group"
                        : "Join Group"}
                  </GroupOption>
                </Box>
                <Box>
                  <Typography variant="h6">Group Description</Typography>
                  {group.description}
                </Box>
                <Box>
                  <Typography variant="h6">Tags</Typography>
                  <TagChips tags={group.tags}/>
                </Box>
              </LeftBox>
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
        </GroupGrid>
        <SecondGrid item container spacing="2" direction="row">
          <EventsGrid item>
            <EventsContainer events={groupEvents}/>
          </EventsGrid>
          <MembersGrid item>
            <MembersCard>
              <VerticalContent>
                <Typography variant="h6">
                  {"Members (" + group.groupSize + ")"}
                </Typography>
                {groupMembers.map((groupMember) => (
                  <Link
                    to={`/profile/${groupMember._id}`}
                    key={groupMember._id}
                  >
                    <Member>
                      <CloudinaryAvatar
                        publicId={groupMember.image}
                        size={40}
                      />
                      <Name align="center">{groupMember.displayName}</Name>
                    </Member>
                  </Link>
                ))}
              </VerticalContent>
            </MembersCard>
          </MembersGrid>
        </SecondGrid>
      </GroupPageGrid>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    group: state.groups.group,
    groupMembers: state.groups.groupMembers,
    groupEvents: state.groups.groupEvents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroupPageData: (groupId) => dispatch(getGroupPageData(groupId)),
    addMember: (groupId, userId) => dispatch(addMember(groupId, userId)),
    removeMember: (groupId, userId) => dispatch(removeMember(groupId, userId)),
    setModalOpen: (isOpen) => dispatch(setModalOpen(isOpen))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetails);
