import {connect} from 'react-redux';
import GenreTags from './GenreTags.js';
import EventDescription from './EventDescription.js';
import EventParticipants from './EventParticipants.js';
import EventComments from './EventComments';
import {Container, Typography, Box} from "@material-ui/core";
import {styled} from "@material-ui/styles";

const Box1 = styled(Box)({
    border: '2px solid black', 
    backgroundColor: 'white',
    alignContent: 'center'
});

const Box2 = styled(Box)({
    border: '1px solid grey', 
    backgroundColor: 'white',
    width: '80%',
    margin: 'auto',
    marginTop: '1rem',
    maxHeight: '25%',
    overflow: 'auto',
    backgroundColor: '#d3d3d3'
});

function EventDetails(props) {
    return (
        <Container>
            <Typography variant="h1">{props.event.name}</Typography>
            <Container>
                <Typography variant="h5">{props.event.location}</Typography>
                <Typography variant="h5">{props.event.date.toUTCString()}</Typography>
            </Container>
            <Box1>
                <Container>
                    <GenreTags genre={props.event.genre}/>
                </Container>
                <Box2>
                    <EventDescription description={props.event.description}/>
                </Box2>
                <Box2>
                    <EventParticipants participants = {props.event.participants}/>
                </Box2>
                <Box2>
                    <EventComments comments = {props.event.comments}/>
                </Box2>
            </Box1>
        </Container>
    )
    }
    const mapStateToProps = (state) => {
        return {event: state.events.viewableEvent};
    }

    export default connect(mapStateToProps)(EventDetails);