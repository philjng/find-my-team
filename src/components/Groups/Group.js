import {Card, CardContent, Container, Typography} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {Button2, SCLink, Typography1} from "../Events/Event";

const GroupCard = styled(Card)({
    backgroundColor: `#ebfaf7`,
    margin: `1rem`
})

export const Group = (props) => {
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
                <Button2 disableElevation size="small" variant="contained">
                    Join Group
                </Button2>
            </CardContent>
        </GroupCard>
    )
}