import {Container, Typography, List, ListItem} from "@material-ui/core";
import {styled} from "@material-ui/styles";

const ListItem1 = styled(ListItem) ({
    border: '1px solid black',
    margin: '0.25rem',
})
function EventParticipants(props) {
    return (
        <Container>
            <Typography variant="h2">Participants</Typography>
            <List>
                {props.participants.map( (participant) => 
                <ListItem1 key={JSON.stringify(participant)}>
                    <Container>
                        <p>{participant.name}</p>
                    </Container>
                </ListItem1>
            )}
            </List>
        </Container>
    )

}
export default EventParticipants;