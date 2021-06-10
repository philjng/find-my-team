import "../styling/Events.css"
import {connect} from 'react-redux';
import {viewEventDetails} from "../actions";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
function Event(props) {
    return (
        <div class = "event_container">
            <p class="event_name">Name: {props.info.name}</p>
            <p class = "event_location">Location: {props.info.location}</p>
            <p class = "event_date">Date: {props.info.date.toUTCString()}</p>
            <Link to = "/eventdetails" onClick = {() => props.viewEventDetails(props.info)}>Details</Link>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {event: state.viewableEvent};
}
export default connect(mapStateToProps, {viewEventDetails})(Event);