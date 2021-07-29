import {Card, CardContent} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {Button2, SCLink, Typography1} from "../Events/Event";
import {connect} from "react-redux";
import {viewGroup} from "../../actions/groups";

const GroupCard = styled(Card)({
    backgroundColor: `#d6f5ef`,
    margin: `1rem`
})

const Group = (props) => {
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
                    {/*TODO: convert whole card to clickable and have it fetch group data and page*/}
                    <SCLink
                        to="/groupdetails"
                        onClick={() => props.viewGroup(props.group)}
                    >
                        View Group
                    </SCLink>
                </Button2>
            </CardContent>
        </GroupCard>
    )
}

const mapDispatchToProps = (dispatch) => ({
    viewGroup: (group) => dispatch(viewGroup(group)),
})

export default connect(null, mapDispatchToProps)(Group)