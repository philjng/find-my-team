import Event from './Event.js';
import {connect} from 'react-redux';

function EventsContainer(props) {
    return (
        <div class = "events_container">
            <ul>
                {props.events.map( (event) => 
                <div>
                    {console.log(event)}
                    <Event info={event}/>
                </div>
                )}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {events: state.events};
}
export default connect(mapStateToProps)(EventsContainer);