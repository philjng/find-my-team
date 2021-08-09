import {Container, Typography, List, ListItem, Box, CircularProgress, Grid} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {connect} from "react-redux";
import {getEventParticipants} from "../../actions/events";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

const _ = require("lodash");

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
  const {
    getEventParticipants,
    participants
  } = props;
  const {id} = useParams();

  useEffect(() => {
    getEventParticipants(id)
  }, [id, getEventParticipants])

  return (
    <Box>
      <Typography variant="h5">Participants</Typography>
      <List1>
        {_.isEmpty(participants) ? <CircularProgress color="primary" size={100}/>
          :
          participants.map((participant) => (
            <ListItem1 key={participant._id}>
              <Container>
                <Typography>{participant.displayName}</Typography>
              </Container>
            </ListItem1>
          ))}
      </List1>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    participants: state.events.eventParticipants
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEventParticipants: (eventId) => dispatch(getEventParticipants(eventId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventParticipants);
