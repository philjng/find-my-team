import {Box1} from "../Events/EventsContainer";
import UserGroups, {CardHeader} from "./UserGroups";
import {Container} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import { connect } from "react-redux";
import Group from "./Group";


const GroupsPage= styled(Container)({
    display: `flex`,
    justifyContent: `space-between`,
    padding: `4rem 0`,
    backgroundColor: `#f7fdfc`
})

const AllGroups = styled(Box1)({
    padding: `1rem`,
    minWidth: `50vw`,
    backgroundColor: `#ebfaf7`
})

const GroupsContainer = (props) => {
    const filtered = props.groups.filter(
        (group) => !props.userGroups.joined.map((group) => group.groupId).includes(group.groupId))

    return (
        <GroupsPage>
            <AllGroups>
                <CardHeader variant="h5">All Groups</CardHeader>
                {filtered.map((group) => (
                    <Group group={group} isMember={false}/>
                    ))}
            </AllGroups>
            <UserGroups/>
        </GroupsPage>
    )
}

const mapStateToProps = (state) => {
    return {
        groups: state.groups.groups,
        userGroups: state.user.userGroups
    }
}

export default connect(mapStateToProps)(GroupsContainer);