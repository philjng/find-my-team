import { connect } from "react-redux";
import GenreTags from "./GenreTags.js";
import EventDescription from "./EventDescription.js";
import EventParticipants from "./EventParticipants.js";
import EventComments from "./EventComments";
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { getEvent, participantJoin, participantLeave, deleteEvent } from "../../actions/events.js";
import "firebase/auth";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext.js";
import { useHistory } from "react-router";

const _ = require("lodash");

const Box1 = styled(Box)({
  border: "2px solid #3f51b5",
  backgroundColor: "white",
  alignContent: "center",
});

const Box2 = styled(Box)({
  border: "1px solid #3f51b5",
  backgroundColor: "#f7fcfc",
  width: "80%",
  margin: "auto",
  marginTop: "1rem",
  maxHeight: "25%",
  overflow: "auto",
});

const Button1 = styled(Button)({
  float: "right",
  backgroundColor: "blue",
  color: "white",
});

const Button2 = styled(Button)({
  float: "right",
  backgroundColor: "red",
  color: "white",
  marginTop: "0.5rem",
  marginRight: "0.5rem"
});

function EventDetails(props) {
  const { id } = useParams();
  const { currentUser } = useAuth();

  const { event, getEvent, participantJoin, participantLeave, deleteEvent} = props;


  const date = new Date(event.startTime).toUTCString();

  useEffect(() => {
    getEvent(id);
  }, [getEvent, id]);

  const history = useHistory();

  const addParticipant = () => {
    participantJoin(id, currentUser.uid, currentUser.email);
  };

  const removeParticipant = () => {
    participantLeave(id, currentUser.uid, currentUser.email);
  }

  const removeEvent = () => {
    deleteEvent(id);
    history.push("/events")
  }

  //TODO: Fix double join bug
  return _.isEmpty(event) ? (
    <CircularProgress />
  ) : (
    <Container>
      <Typography variant="h1">{event.name}</Typography>
      <Container>
        {event.participants.filter(
          (participant) => participant.uid === currentUser.uid
        ).length === 0 ? (
          <Button1 onClick={addParticipant}>Join</Button1>
        ) : (
          <Button1 onClick={removeParticipant}>Leave</Button1>
        )}
        <Typography variant="h5">{event.location}</Typography>
        <Typography variant="h5">{date}</Typography>
      </Container>
      <Button2 onClick={removeEvent}>Delete</Button2>
      <Box1>
        <Container>
          <GenreTags genreTags={event.genreTags} />
        </Container>
        <Box2>
          <EventDescription description={event.description} />
        </Box2>
        <Box2>
          <EventParticipants participants={event.participants} />
        </Box2>
        <Box2>
          <EventComments eventId={id} comments={event.comments} />
        </Box2>
      </Box1>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    event: state.events.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEvent: (id) => getEvent(dispatch, id),
    participantJoin: (eventId, userId, userEmail) =>
      participantJoin(dispatch, eventId, userId, userEmail),
    participantLeave: (eventId, userId, userEmail) =>
      participantLeave(dispatch, eventId, userId, userEmail),
    deleteEvent: (eventId) =>
      deleteEvent(dispatch,eventId)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
