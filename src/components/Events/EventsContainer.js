import Event from './Event.js';
import {connect} from 'react-redux';
import {viewUpcomingEventsOnly, viewAllEvents} from '../../actions';
import {Container, Button, List, ListItem} from "@material-ui/core";

function EventsContainer(props) {
    return (
        <Container class = "events_container">
            <Button onClick={props.all}>All</Button>
            <Button onClick = {props.upcoming}>Upcoming</Button>
            <List>
                {props.viewableEvents.map( (event) => 
                <ListItem key = {JSON.stringify(event)}>
                <Container>
                    <Event info={event}/>
                </Container>
                </ListItem>
                )}
            </List>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        events: state.events,
        viewableEvents: state.viewableEvents
    };
}

export default connect(mapStateToProps, {upcoming: viewUpcomingEventsOnly, all: viewAllEvents})(EventsContainer);