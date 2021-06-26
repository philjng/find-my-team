import {Box1} from "./Events/EventsContainer";
import {UserGroups} from "./UserGroups";
import {Container, Typography} from "@material-ui/core";
import {styled} from "@material-ui/styles";

const GroupsContainer = styled(Container)({
    display: `flex`,
    justifyContent: `space-between`,
    padding: `4rem 0`
})

const AllGroups = styled(Box1)({
    padding: `1rem`,
    minWidth: `50vw`
})

function Groups() {
    return (
        <GroupsContainer>
            <AllGroups>
                <Typography variant="h6">All Groups</Typography>
            </AllGroups>
            <UserGroups/>
        </GroupsContainer>
    )
}

export default Groups;