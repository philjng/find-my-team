import {connect} from 'react-redux';
import GenreTags from './GenreTags.js';
import EventDescription from './EventDescription.js';
import EventParticipants from './EventParticipants.js';
import EventComments from './EventComments';
import {Container, Typography} from "@material-ui/core";

function EventDetails(props) {
    return (
        <Container>
            <Typography variant="h5">{props.event.name}</Typography>
            <Container><Typography variant="body2">{props.event.location}</Typography>
            <Typography variant="h5">{props.event.date.toUTCString()}</Typography></Container>
            <Container>
                <GenreTags genre={props.event.genre}/>
                <EventDescription description={props.event.description}/>
                <EventParticipants participants = {props.event.participants}/>
                <EventComments comments = {props.event.comments}/>
            </Container>
        </Container>
    )
    }
    const mapStateToProps = (state) => {
        return {event: state.viewableEvent};
    }

    export default connect(mapStateToProps)(EventDetails);