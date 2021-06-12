import {Box, Card, CardContent, Container, List, ListItem, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Event from "./Event";

const useStyles = makeStyles(()=> ({
    card: {
        margin: "50px",
        backgroundColor: "#f7fcfc",
    }
}))

const UserEvents = (props) => {
    const classes = useStyles()

    console.log("props: ", props);

    return (
        <Box>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6">Up Next:</Typography>
                    <Box>
                        <Event info={props.events[0]}></Event>
                    </Box>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6">Your Events</Typography>
                    <List>
                        {props.viewableEvents.map( (event) =>
                            <ListItem key = {JSON.stringify(event)}>
                                <Container>
                                    <Event info={event}/>
                                </Container>
                            </ListItem>
                        )}
                    </List>
                </CardContent>
            </Card>
        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        events: state.events.events,
        viewableEvents: state.events.viewableEvents
    };
}

export default connect(mapStateToProps)(UserEvents)