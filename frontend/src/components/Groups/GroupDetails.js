import {connect} from 'react-redux';
import {Avatar, Box, Button, Card, CardContent, CardMedia, Container, Typography} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {useState} from "react";
import {deleteGroup, updateMemberList} from "../../actions/groups";
import {useHistory} from "react-router-dom";
import {addGroup, removeGroup} from "../../actions/user";

export const FlexBox = styled(Box)({
    display: `flex`,
})

export const VerticalContent = styled(CardContent)({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`
})

const GroupPage = styled(Container)({
    backgroundColor: `#f7fdfc`,
})

const GroupCard = styled(Card)({
    backgroundColor: `#ebfaf7`,
    margin: `1rem`,
})

const GroupContent = styled(CardContent)({
    display: `flex`,
    justifyContent: `space-between`
})

const LeftBox = styled(Box)({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`
})

const Image = styled(CardMedia)({
    width: `50%`
})

const SecondBox = styled(FlexBox)({
    justifyContent: `space-between`,
    margin: `1rem`,
})

const EventCard = styled(Card)({
    backgroundColor: `#d6f5ef`,
    flexGrow: `2`,
    marginRight: `1rem`
})

const MembersCard = styled(Card)({
    backgroundColor: `#d6f5ef`,
})

const Member = styled(FlexBox)({
    margin: `0.5rem 0`,
})

const Name = styled(Typography)({
    marginLeft: `0.5rem`,
    marginTop: `0.5rem`,
    verticalAlign: `center`
})

const GroupOption = styled(Button)({
    marginTop: `0.5rem`,
    marginRight: `0.5rem`
})

export const DeleteButton = styled(GroupOption)({
    color: 'black'
})

function GroupDetails(props) {
    const { user, group } = props;
    const history = useHistory();

    const isManager = props.group.creatorId === user.user_id
    const [isMember, setIsMember] = useState(group.memberIds.includes(user.user_id))
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = () => {
        window.confirm("Are you sure you want to delete this group? This action cannot be undone.")
        && props.deleteGroup(group._id)
        && history.goBack();
    }

    const joinGroup = () => {
        const memberIds = [...group.memberIds, user.user_id]
        props.addGroup(group)
        props.updateMemberList({
            ...group,
            memberIds: memberIds,
            groupSize: memberIds.length
        })
        setIsMember(true);
    }

    const removeGroup = () => {
        const memberIds = group.memberIds.filter((id) => id !== user.user_id)
        window.confirm("Are you sure you want to leave the group?") && props.removeGroup(group)
         && props.updateMemberList({
            ...group,
            memberIds: memberIds,
            groupSize: memberIds.length
        })
        setIsMember(false)
    }

    // TODO: might want to abstract parts away and simplify this js file
    return (
        <GroupPage>
            <GroupCard>
                <GroupContent>
                    <LeftBox>
                        <Box>
                            <Typography variant="h4">
                                <Box fontWeight="fontWeightBold">
                                    {group.name}
                                </Box>
                            </Typography>
                            <Typography component={'span'}>
                                <Box fontWeight="fontWeightLight">{"Managed by " + (isManager ? "You" : group.creator)}</Box>
                                <Box fontWeight="fontWeightLight">{group.groupSize + (group.groupSize === 1 ? " member" : " members") }</Box>
                            </Typography>
                            {isEditing ?
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
                                  <DeleteButton
                                    disableElevation
                                    size="small"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete()}
                                  >
                                      Delete group
                                  </DeleteButton>
                              </Box>
                              : <GroupOption
                              disableElevation
                              size="small"
                              variant="contained"
                              onClick={() => {
                                  if (isManager) {
                                      setIsEditing(true);
                                  }
                                  else {
                                      isMember ? removeGroup() : joinGroup()
                                  }
                              }}
                            >
                                {isManager ? "Edit" : isMember ? "Leave Group" : "Join Group"}
                            </GroupOption>}
                        </Box>
                        <Box>
                            <Typography variant="h6">Group Description</Typography>
                            {group.description}
                        </Box>
                        <Box>
                            <Typography variant="h6">Tags</Typography>
                            <Typography>
                                {group.tags.join(", ")}
                            </Typography>
                        </Box>
                    </LeftBox>
                    {/*TODO: images for group*/}
                    <Image>
                        <img
                            src="https://i.ytimg.com/vi/NVuL7mLqT6g/maxresdefault.jpg"
                            alt="default"
                            style={{
                                width: "100%",
                                height: "auto"
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
                        <Typography variant="h6">{"Members (" + group.groupSize + ")"}</Typography>
                        {/*TODO: set up user names and icons*/}
                        {group.memberIds.map((id) => (
                            <Member key={id}>
                                <Avatar/>
                                <Name align="center">No Name</Name>
                            </Member>
                        ))}
                    </VerticalContent>
                </MembersCard>
            </SecondBox>
        </GroupPage>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        group: state.groups.group
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteGroup: (groupId) => dispatch(deleteGroup(groupId)),
        addGroup: (group) => dispatch(addGroup(group)),
        removeGroup: (group) => dispatch(removeGroup(group)),
        updateMemberList: (group) => dispatch(updateMemberList(group))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetails);