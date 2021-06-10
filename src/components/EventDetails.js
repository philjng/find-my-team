import {connect} from 'react-redux';
import GenreTags from './GenreTags.js';
import EventDescription from './EventDescription.js';
import EventParticipants from './EventParticipants.js';
import EventComments from './EventComments';

function EventDetails(props) {
    return (
        <div>
            <h1>{props.event.name}</h1>
            <div><p>{props.event.location}</p><p>{props.event.date.toUTCString()}</p></div>
            <div>
                <GenreTags genre={props.event.genre}/>
                <EventDescription description={props.event.description}/>
                <EventParticipants participants = {props.event.participants}/>
                <EventComments comments = {props.event.comments}/>
            </div>
        </div>
    )
    }
    const mapStateToProps = (state) => {
        return {event: state.viewableEvent};
    }

    export default connect(mapStateToProps)(EventDetails);