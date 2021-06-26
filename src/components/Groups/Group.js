import {Card, CardContent, Container, Typography} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {Button2, SCLink, Typography1} from "../Events/Event";
import {connect} from "react-redux";
import {addGroup, removeGroup} from "../../actions/user";

const GroupCard = styled(Card)({
    backgroundColor: `#d6f5ef`,
    margin: `1rem`
})

const Group = (props) => {
    const joinGroup = (group) => {
        props.addGroup(group)
    }

    const removeGroup = (group) => {
        props.removeGroup(group)
    }

    return (
        <GroupCard>
            <CardContent>
                <Typography1 variant="h5">
                    {props.group.name}
                </Typography1>
                <Typography1 variant="body1">
                    Group type: {props.group.interests.join(", ")}
                </Typography1>
                <Typography1 variant="body2">
                    Number of members: {props.group.groupSize}
                </Typography1>
                <Button2 disableElevation size="small" variant="contained">
                    <SCLink
                        to="/groupdetails"
                        onClick={() => {}}
                    >
                        View Group
                    </SCLink>
                </Button2>
                <Button2
                    disableElevation
                    size="small"
                    variant="contained"
                    onClick={() => {props.isMember ? removeGroup(props.group) : joinGroup(props.group)}}
                >
                    {props.isMember ? "Remove Group" : "Join Group" }
                </Button2>
            </CardContent>
        </GroupCard>
    )
}

export default connect(null, {addGroup, removeGroup})(Group)