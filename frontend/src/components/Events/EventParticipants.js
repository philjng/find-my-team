import {Container, Typography, List, ListItem, Box} from "@material-ui/core";
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
    <Box>
      {/*<Typography variant="h5">Participants</Typography>*/}
      {/*<List1>*/}
      {/*  {props.participantIds.map((participantId) => (*/}
      {/*    <ListItem1 key={JSON.stringify(participantId)}>*/}
      {/*      <Container>*/}
      {/*        <Typography>{participantId}</Typography>*/}
      {/*      </Container>*/}
      {/*    </ListItem1>*/}
      {/*  ))}*/}
      {/*</List1>*/}
    </Box>
  );
}
export default EventParticipants;
