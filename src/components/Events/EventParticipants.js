import {Container, Typography, List, ListItem} from "@material-ui/core";
function EventParticipants(props) {
    return (
        <Container>
            <Typography variant="h2">Participants</Typography>
            <List>
                {props.participants.map( (participant) => 
                <ListItem key={JSON.stringify(participant)}>
                    <Container>
                        <p>{participant.name}</p>
                    </Container>
                </ListItem>
            )}
            </List>
        </Container>
    )

}
export default EventParticipants;