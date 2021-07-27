import {
  Card,
  CardContent,
  TextField,
  Box,
  Typography,
  Button,
  Select,
  MenuItem
} from "@material-ui/core";
// import {KeyboardTimePicker, KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import { styled } from "@material-ui/styles";
import { useState } from "react";
import { CardHeader } from "../Groups/UserGroups";
import firebase from "firebase/app";
import "firebase/auth";
import {connect} from 'react-redux';
let axios = require("axios");

const CreateEventCard = styled(Card)({
  backgroundColor: `#d6f5ef`,
  margin: `2rem auto`,
  width: `75%`,
});

const Input = styled(TextField)({
  marginBottom: `1rem`
})

const Form = styled(Box)({
  display: `flex`,
  justifyContent: `space-around`
})

const ButtonBox = styled(Box)({
  margin: 'auto'
})

const AddButton = styled(Button)({
  marginTop: '0.4rem',
  marginLeft: '1rem'
})

const SubmitButton = styled(Button)({
  float: 'right',
  width: '100%'
})

const Dropdown = styled(Select)({
  width: '80%'
})


function Create(props) {
  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [tagText, setTagText] = useState("");
  const [tags, setTags] = useState([]);
  const [eventGroup, setEventGroup] = useState("");

  const addTag = () => {
    let tags_cpy = [...tags];
    tags_cpy.push(tagText);
    setTags(tags_cpy);
    setTagText("");
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:3001/events", {
        title: eventTitle,
        location: eventLocation,
        description: eventDescription,
        start: eventStart,
        end: eventEnd,
        tags: tags,
        user: {
          uid: firebase.auth().currentUser.uid,
          email: firebase.auth().currentUser.email,
        },
        group: eventGroup
      })
      .then((result) => {
        console.log("success");
        setEventTitle("");
        setEventLocation("");
        setEventDescription("");
        setEventStart("");
        setEventEnd("");
        setTags([]);
        setEventGroup("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <CreateEventCard>
      <CardContent>
        <CardHeader align="center" variant="h5">
          Create Event
        </CardHeader>
        <Form>
          <Box>
        <Box>
          <Typography>Event Title</Typography>
          <Input variant="filled"
                            size="small"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          ></Input>
        </Box>
        <Box>
          <Typography>Location</Typography>
          <Input variant="filled"
                            size="small"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          ></Input>
        </Box>
        <Box>
          <Typography>Description</Typography>
          <Input
          variant="filled"
          multiline
          rows={3}
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          ></Input>
        </Box>
        </Box>
        <Box>
        <Box>
          <Typography>Start Time</Typography>
          <Input
            type="datetime-local"
            variant="filled"
            size="small"
            value={eventStart}
            onChange={(e) => setEventStart(e.target.value)}
          ></Input>
        </Box>
        <Box>
          <Typography>End Time</Typography>
          <Input
            type="datetime-local"
            variant="filled"
            size="small"
            value={eventEnd}
            onChange={(e) => setEventEnd(e.target.value)}
          ></Input>
        </Box>
        <Box>
          <Typography>Group</Typography>
          <Dropdown value = {eventGroup} onChange={(e) => setEventGroup(e.target.value)}>
            <MenuItem value = {""} >Public</MenuItem>
            {props.user.userGroups.created.map((group) => (
              <MenuItem value={group._id}>{group.name}</MenuItem>
            ))}
            {props.user.userGroups.joined.map((group) => (
              <MenuItem value={group._id}>{group.name}</MenuItem>
            ))}
          </Dropdown>
        </Box>
        <Box>
          <Typography>Tags</Typography>
          <Input
          variant="filled"
          size="small"
            value={tagText}
            onChange={(e) => setTagText(e.target.value)}
          ></Input>
          <AddButton variant="contained" onClick={addTag}>Add</AddButton>
        </Box>
        <ButtonBox>
          <SubmitButton type="submit" color="primary" variant="contained" onClick={handleSubmit}>Submit</SubmitButton>
          </ButtonBox>
        </Box>
        </Form>
      </CardContent>
    </CreateEventCard>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Create);
