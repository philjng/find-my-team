import {Box, Card, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(()=> ({
    card: {
        margin: "1rem",
        backgroundColor: "#f7fcfc",
    }
}))

export const UserEvents = () => {
    const classes = useStyles()

    return (
        <Box>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6">Up Next:</Typography>

                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6">Your Events</Typography>
                </CardContent>
            </Card>
        </Box>
    )
}