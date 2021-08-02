import {connect} from "react-redux";
import TagChips from "./TagChips.js";
import EventDescription from "./EventDescription.js";
import EventParticipants from "./EventParticipants.js";
import EventComments from "./EventComments";
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress, Card, CardContent,
} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {getEvent, participantJoin, participantLeave, deleteEvent} from "../../actions/events.js";
import "firebase/auth";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext.js";
import {useHistory} from "react-router";

const _ = require("lodash");

const EventCard = styled(Card)({
  backgroundColor: "#f7fcfc",
  margin: `2rem 0`
})

const DateBox = styled(Box)({
  marginBottom: `0.5rem`
})

const Box2 = styled(Box)({
  float: "left",
  width: "80%",
  marginTop: "1rem",
  maxHeight: "25%",
  overflow: "auto",
});

const Button1 = styled(Button)({
  float: "right",
  marginLeft: "0.5rem"
});

function EventDetails(props) {
  const {event, getEvent, participantJoin, participantLeave, deleteEvent, user} = props;

  const {id} = useParams();
  const {currentUser} = useAuth();

  const [isParticipant, setIsParticipant] = useState(event?.participants?.map((participants) => participants.uid).includes(user.user_id))

  const date = new Date(event.startTime).toUTCString();

  useEffect(() => {
    getEvent(id)
      .then(() => {
      })
  }, [getEvent, id]);

  const history = useHistory();

  const addParticipant = () => {
    participantJoin(id, currentUser.uid, currentUser.email)
      .then(() => {
        setIsParticipant(true)
      })
  };

  const removeParticipant = () => {
    participantLeave(id, currentUser.uid, currentUser.email)
      .then(() => {
        setIsParticipant(false)
      })
  }

  const removeEvent = () => {
    deleteEvent(id);
    history.push("/events")
  }

  //TODO: Fix double join bug
  return _.isEmpty(event) ? (
    <CircularProgress/>
  ) : (
    <Container>
      <EventCard>
        <CardContent>
          <Typography variant="h4">{event.title}</Typography>
          <Button1 onClick={removeEvent} disableElevation variant="contained" color="secondary">Delete Event</Button1>
          <Button1
            disableElevation
            variant="contained"
            color="primary"
            onClick={() => {
              isParticipant ? removeParticipant() : addParticipant()
            }}
          >{isParticipant ? "Going" : "Not Going"}</Button1>
          <Typography component={'span'}>
            <Box fontWeight="fontWeightMedium">{event.location}</Box>
            <DateBox fontWeight="fontWeightMedium>">{date}</DateBox>
          </Typography>
          <TagChips genreTags={event.genreTags}/>
          <Box2>
            <EventDescription description={event.description}/>
          </Box2>
          <Box2>
            <EventParticipants participants={event.participants}/>
          </Box2>
          <Box2>
            <EventComments eventId={id} comments={event.comments}/>
          </Box2>
        </CardContent>
      </EventCard>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    event: state.events.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEvent: (id) => getEvent(dispatch, id),
    participantJoin: (eventId, userId, userEmail) => participantJoin(dispatch, eventId, userId, userEmail),
    participantLeave: (eventId, userId, userEmail) => participantLeave(dispatch, eventId, userId, userEmail),
    deleteEvent: (eventId) => deleteEvent(dispatch, eventId)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
