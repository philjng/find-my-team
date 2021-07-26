import { connect } from "react-redux";
import GenreTags from "./GenreTags.js";
import EventDescription from "./EventDescription.js";
import EventParticipants from "./EventParticipants.js";
import EventComments from "./EventComments";
import { Container, Typography, Box, Button } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { participantJoin } from "../../actions/events.js";
import firebase from "firebase/app";
import "firebase/auth";
let axios = require("axios");

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
});

function EventDetails(props) {
  const addParticipant = () => {
    if (
      !JSON.stringify(props.event.participants).includes(
        JSON.stringify({
          uid: firebase.auth().currentUser.uid,
          email: firebase.auth().currentUser.email,
        })
      )
    ) {
      axios
        .patch("http://localhost:3001/events/participant", {
          _id: props.event._id,
          participant: {
            uid: firebase.auth().currentUser.uid,
            email: firebase.auth().currentUser.email,
          },
        })
        .then(() => {
          props.participantJoin(
            {
              uid: firebase.auth().currentUser.uid,
              email: firebase.auth().currentUser.email,
            },
            props.event,
            props.events
          );
        })
        .catch((err) => {
          console.log("there was an error");
          console.log(err);
        });
    }
  };
 const startDate = new Date(props.event.startTime).toUTCString();
  return (
    <Container>
      <Typography variant="h1">{props.event.title}</Typography>
      <Container>
        <Button1 onClick={addParticipant}>Join</Button1>
        <Typography variant="h4">{props.event.location}</Typography>
        <Typography variant="h5">{startDate}</Typography>
      </Container>
      <Box1>
        <Container>
          <GenreTags genreTags={props.event.genreTags} />
        </Container>
        <Box2>
          <EventDescription description={props.event.description} />
        </Box2>
        <Box2>
          <EventParticipants participants={props.event.participants} />
        </Box2>
        <Box2>
          <EventComments comments={props.event.comments} />
        </Box2>
      </Box1>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    event: state.events.viewableEvent,
    userId: state.user.user_id,
    user: state.user,
    events: state.events.viewableEvents,
  };
};

export default connect(mapStateToProps, { participantJoin })(EventDetails);
