import { Container, Typography, List, ListItem } from "@material-ui/core";
import { styled } from "@material-ui/styles";

const ListItem1 = styled(ListItem)({
  border: "1px solid grey",
  margin: "0.25rem",
  backgroundColor: "white",
  width: "25%",
});

const List1 = styled(List)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  margin: "0.25rem",
});
function EventParticipants(props) {
  return (
    <Container>
      <Typography variant="h5">Participants</Typography>
      <List1>
        {props.participants.map((participant) => (
          <ListItem1 key={JSON.stringify(participant)}>
            <Container>
              <Typography>{participant.email}</Typography>
            </Container>
          </ListItem1>
        ))}
      </List1>
    </Container>
  );
}
export default EventParticipants;
