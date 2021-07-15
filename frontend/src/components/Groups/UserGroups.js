import {Card, CardContent, Typography} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {connect} from "react-redux";
import Group from "./Group";

const UserGroup = styled(Card)({
    margin: `1rem`,
    backgroundColor: `#ebfaf7`,
})

export const CardHeader = styled(Typography)({
    marginBottom: `1rem`
})

const UserGroupsContainer = (props) => {

    return (
        <UserGroup>
            <CardContent>
                <CardHeader variant="h5">Your Groups</CardHeader>
                <Typography variant="h6">Groups you own</Typography>
                <Typography variant="h6">Groups you joined</Typography>
                {(props.userGroups.joined.length === 0) &&
                <Typography>You are not currently in any groups!</Typography>}
                {props.userGroups.joined.map((group) => (
                    <Group group={group} isMember={true} key={group.name+group.authorId}/>
                ))}
            </CardContent>
        </UserGroup>
    )
}

const mapStateToProps = (state) => ({userGroups: state.user.userGroups})

export default connect(mapStateToProps)(UserGroupsContainer)