import Event from './Event.js';
import {connect} from 'react-redux';
import {viewUpcomingEventsOnly, viewAllEvents} from '../../actions/events';
import {Container, Button, List, ListItem, Box} from "@material-ui/core";
import {styled} from "@material-ui/styles";

const Box1 = styled(Box)({
    border: '2px solid black', 
    backgroundColor: 'white'
});

const Button1 = styled(Button)({
    border: '1px solid black',
    background: '#1976d2',
    margin: '0.25rem',
    height: '1rem',
    width: 'auto'
});

function EventsContainer(props) {
    return (
        <Container className = "events_container">
            <Box1>
                <Button1 onClick={props.all}>All</Button1>
                <Button1 onClick = {props.upcoming}>Upcoming</Button1>
                <List style={{maxHeight: '50%', overflow:'auto'}}>
                    {props.viewableEvents.map( (event) => 
                    <ListItem key = {JSON.stringify(event)}>
                        <Container>
                            <Event info={event}/>
                        </Container>
                    </ListItem>
                    )}
                </List>
            </Box1>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        events: state.events.events,
        viewableEvents: state.events.viewableEvents
    };
}

export default connect(mapStateToProps, {upcoming: viewUpcomingEventsOnly, all: viewAllEvents})(EventsContainer);