import {Box1} from "../Events/EventsContainer";
import {UserGroups} from "./UserGroups";
import {Container, Typography} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import { connect } from "react-redux";
import {Group} from "./Group";


const GroupsPage= styled(Container)({
    display: `flex`,
    justifyContent: `space-between`,
    padding: `4rem 0`,
    backgroundColor: `#f7fdfc`
})

const AllGroups = styled(Box1)({
    padding: `1rem`,
    minWidth: `50vw`,
    backgroundColor: `#f7fdfc`
})

const GroupsContainer = (props) => {
    return (
        <GroupsPage>
            <AllGroups>
                <Typography variant="h6">All Groups</Typography>
                {props.groups.map((group) => (
                    <Group group={group}/>
                    ))}
            </AllGroups>
            <UserGroups/>
        </GroupsPage>
    )
}

const mapStateToProps = (state) => {
    return {
        groups: state.groups.groups
    }
}

export default connect(mapStateToProps)(GroupsContainer);