import {Card, CardContent} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {Button2, SCLink, Typography1} from "../Events/Event";
import {connect} from "react-redux";
import {addGroup, removeGroup} from "../../actions/user";
import {updateMemberList, viewGroup} from "../../actions/groups";
import {useAuth} from "../../context/AuthContext";

const GroupCard = styled(Card)({
    backgroundColor: `#d6f5ef`,
    margin: `1rem`
})

const Group = (props) => {
    // TODO: remove and use store data
    const { currentUser } = useAuth()

    const joinGroup = (group) => {
        const memberIds = [...group.memberIds, currentUser.uid]
        props.addGroup(group)
        props.updateMemberList({
            ...group,
            memberIds: memberIds,
            groupSize: memberIds.length
        })
    }

    const removeGroup = (group) => {
        const memberIds = group.memberIds.filter((id) => id !== currentUser.uid)
        window.confirm("Leave the group?") && props.removeGroup(group)
        props.updateMemberList({
            ...group,
            memberIds: memberIds,
            groupSize: memberIds.length
        })
    }

    return (
        <GroupCard>
            <CardContent>
                <Typography1 variant="h5">
                    {props.group.name}
                </Typography1>
                <Typography1 variant="body1">
                    Tags: {props.group.tags.join(", ")}
                </Typography1>
                <Typography1 variant="body2">
                    Number of members: {props.group.groupSize}
                </Typography1>
                <Button2 disableElevation size="small" variant="contained">
                    <SCLink
                        to="/groupdetails"
                        onClick={() => props.viewGroup(props.group)}
                    >
                        View Group
                    </SCLink>
                </Button2>
                {!props.isCreator && <Button2
                    disableElevation
                    size="small"
                    variant="contained"
                    onClick={() => {props.isMember ? removeGroup(props.group) : joinGroup(props.group)}}
                >
                    {props.isMember ? "Leave Group" : "Join Group" }
                </Button2>}
            </CardContent>
        </GroupCard>
    )
}

const mapDispatchToProps = (dispatch) => ({
    addGroup: (group) => dispatch(addGroup(group)),
    removeGroup: (group) => dispatch(removeGroup(group)),
    viewGroup: (group) => dispatch(viewGroup(group)),
    updateMemberList: (group) => dispatch(updateMemberList(group))
})

export default connect(null, mapDispatchToProps)(Group)