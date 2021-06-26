import {Card, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Group from "./Group";


const useStyles = makeStyles(()=> ({
    card: {
        margin: "1rem",
        backgroundColor: "#ebfaf7",
    }
}))

const UserGroups = (props) => {
    const classes = useStyles()

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6">Your Groups</Typography>
                {(props.userGroups.length === 0) &&
                <Typography>You are not currently in any groups!</Typography>}
                {props.userGroups.map((group) => (
                    <Group group={group} isMember={true}/>
                ))}
            </CardContent>
        </Card>
    )
}

const mapStateToProps = (state) => ({userGroups: state.user.userGroups})

export default connect(mapStateToProps)(UserGroups)