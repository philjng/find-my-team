function EventParticipants(props) {
    return (
        <div>
            <h1>Participants</h1>
            {props.participants.map( (participant) => 
             <div>
             <p>{participant.name}</p>
            </div>
            )};
        </div>
    )

}
export default EventParticipants;