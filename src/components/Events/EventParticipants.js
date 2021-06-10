function EventParticipants(props) {
    return (
        <div>
            <h1>Participants</h1>
            <ul>
                {props.participants.map( (participant) => 
                <li>
                    <div>
                        <p>{participant.name}</p>
                    </div>
                </li>
            )};
            </ul>
        </div>
    )

}
export default EventParticipants;