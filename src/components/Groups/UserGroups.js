import {Card, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(()=> ({
    card: {
        margin: "1rem",
        backgroundColor: "#f7fcfc",
    }
}))

export const UserGroups = () => {
    const classes = useStyles()

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6">Your Groups</Typography>
                <Typography>You are not currently in any groups!</Typography>
            </CardContent>
        </Card>
    )
}