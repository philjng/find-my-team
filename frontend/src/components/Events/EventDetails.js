import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
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
import { getEvent, participantJoin } from "../../actions/events.js";
import "firebase/auth";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext.js";

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
  margin: "1rem",
});

function EventDetails(props) {
  const { id } = useParams();
  const { currentUser } = useAuth();

  const { event, getEvent, participantJoin } = props;

  useEffect(() => {
    getEvent(id);
  }, [getEvent, id]);

  const addParticipant = () => {
//       axios
//         .patch("http://localhost:3001/events/removeParticipant", {
//           _id: props.event._id,
//           participant: {
//             uid: firebase.auth().currentUser.uid,
//             email: firebase.auth().currentUser.email,
//           },
//         })
//         .then(() => {
//           props.participantLeave(
//             {
//               uid: firebase.auth().currentUser.uid,
//               email: firebase.auth().currentUser.email,
//             },
//             props.event,
//             props.events
//           );
//         })
//         .catch((err) => {
//           console.log("there was an error leaving");
//           console.log(err);
//         });
    participantJoin(id, currentUser.uid, currentUser.email);
  };

  return _.isEmpty(event) ? (
    <CircularProgress />
  ) : (
    <Container>
      <Typography variant="h1">{event.name}</Typography>
      <Container>
        {event.participants.filter(
          (participant) => participant.id === currentUser.uid
        ).length === 0 ? (
          <Button1 onClick={addParticipant}>Join</Button1>
        ) : (
          <Button1>Leave</Button1>
        )}
        <Typography variant="h5">{event.location}</Typography>
        <Typography variant="h5">{event.startTime}</Typography>
      </Container>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
