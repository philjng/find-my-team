import {Box, Card, CardContent, Container, List, ListItem, Typography} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {connect} from "react-redux";
import Event from "./Event";

const NextEvent = styled(Card)({
    margin: `50px`,
    backgroundColor: `#8bbdda`
})

const EventsList = styled(Card)({
    margin: `50px`,
    backgroundColor: `#ebfaf7`
})

const UserEvents = (props) => {
    // can potentially just take in EventsContainer to use after refactor
    return (
        <Box>
            <NextEvent>
                <CardContent>
                    <Typography variant="h6">Up Next:</Typography>
                    <Box>
                        <Event info={props.events[0]}></Event>
                    </Box>
                </CardContent>
            </NextEvent>
            <EventsList>
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
            </EventsList>
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