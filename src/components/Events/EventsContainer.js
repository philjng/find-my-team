import Event from './Event.js';
import {connect} from 'react-redux';
import {viewUpcomingEventsOnly, viewAllEvents} from '../../actions';

function EventsContainer(props) {
    return (
        <div class = "events_container">
            <button onClick={props.all}>All</button>
            <button onClick = {props.upcoming}>Upcoming</button>
            <ul>
                {props.viewableEvents.map( (event) => 
                <li key = {JSON.stringify(event)}>
                <div>
                    <Event info={event}/>
                </div>
                </li>
                )}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        events: state.events,
        viewableEvents: state.viewableEvents
    };
}

export default connect(mapStateToProps, {upcoming: viewUpcomingEventsOnly, all: viewAllEvents})(EventsContainer);