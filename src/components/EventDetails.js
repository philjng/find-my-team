import {connect} from 'react-redux';

function EventDetails(props) {
    return (
        <div>
            <h1>TODO: EventDetails Page</h1>
            <p>{props.event.name}</p>
        </div>
    );
    }
    const mapStateToProps = (state) => {
        console.log(state);
        return {event: state.viewableEvent};
    }

    export default connect(mapStateToProps)(EventDetails);