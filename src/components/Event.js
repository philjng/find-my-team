import "../styling/Events.css"
function Event(props) {
    return (
        <div class = "event_container">
            <p class="event_name">Name: {props.info.name}</p>
            <p class = "event_location">Location: {props.info.location}</p>
            <p class = "event_date">Date: {props.info.date.toUTCString()}</p>
        </div>
    )
}
export default Event;