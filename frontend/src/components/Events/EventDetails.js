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
  CircularProgress, Card, CardContent, Select, MenuItem, FormControl, ButtonGroup, InputLabel,
} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {getEvent, participantJoin, participantLeave, deleteEvent} from "../../actions/events.js";
import "firebase/auth";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

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

const Buttons = styled(Box)({
  float: "right",
  marginLeft: "0.5rem"
})

const Button1 = styled(Button)({
  marginRight: "1rem"
});

function EventDetails(props) {
  const {event, getEvent, participantJoin, participantLeave, deleteEvent, user} = props;
  const {id} = useParams();

  const isCreator = event.creatorId === user.user_id;
  const [isParticipant, setIsParticipant] = useState(false)

  const date = new Date(event.startTime).toUTCString();

  useEffect(() => {
    getEvent(id)
  }, [getEvent, id]);

  useEffect(() => {
    !_.isEmpty(event) && setIsParticipant(event?.participants?.map((participants) => participants.uid).includes(user.user_id))
  }, [event, user.user_id])

  const history = useHistory();

  const addParticipant = () => {
    participantJoin(id, user.user_id, user.email)
      .then(() => {
        setIsParticipant(true)
      })
  };

  const removeParticipant = () => {
    participantLeave(id, user.user_id, user.email)
      .then(() => {
        setIsParticipant(false)
      })
  }

  const handleChange = (e) => {
    const willParticipate = e.target.value;
    if (e.target.value !== isParticipant) {
      willParticipate ? addParticipant() : removeParticipant()
    }
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
          <Buttons>
            <Button1 onClick={removeEvent} disableElevation variant="contained">Edit Event</Button1>
            <FormControl variant="outlined" style={{minWidth: 120}} color="primary">
              <InputLabel id="outlined-participation-label">{isParticipant ? "Going" : "Not Going"}</InputLabel>
              <Select
                labelId="participation-label"
                id="participation"
                value={isParticipant}
                onChange={handleChange}
                label="participation"
              >
                <MenuItem value={true}>Going</MenuItem>
                <MenuItem value={false}> Not Going</MenuItem>
              </Select>
            </FormControl>
          </Buttons>
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
