import "../../styling/Events.css"
import {connect} from 'react-redux';
import {viewEventDetails} from "../../actions";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Container, Typography} from "@material-ui/core";
function Event(props) {
    return (
        <Container className = "event_container">
            <Typography variant="h5" className= "event_name">{props.info.name}</Typography>
            <Typography variant="body1" className = "event_location">Location: {props.info.location}</Typography>
            <Typography variant="body2" className = "event_date">Date: {props.info.date.toUTCString()}</Typography>
            <Link to = "/eventdetails" onClick = {() => props.viewEventDetails(props.info)}>Details</Link>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {event: state.viewableEvent};
}
export default connect(mapStateToProps, {viewEventDetails})(Event);