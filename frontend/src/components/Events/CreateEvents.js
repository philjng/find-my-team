import {
  Card,
  CardContent,
  TextField,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { useState } from "react";
import { CardHeader } from "../Groups/UserGroups";
import firebase from "firebase/app";
import "firebase/auth";
let axios = require("axios");

const CreateEventCard = styled(Card)({
  backgroundColor: `#d6f5ef`,
  margin: `2rem auto`,
  width: `75%`,
});

function Create() {
  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [tagText, setTagText] = useState("");
  const [tags, setTags] = useState([]);

  const addTag = () => {
    console.log(tags);
    let tags_cpy = [...tags];
    tags_cpy.push(tagText);
    console.log(tags_cpy);
    setTags(tags_cpy);
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
          id: firebase.auth().currentUser.uid,
          email: firebase.auth().currentUser.email,
        },
      })
      .then((result) => {
        console.log("success");
      })
      .catch((err) => console.log("err"));
  };

  return (
    <CreateEventCard>
      <CardContent>
        <CardHeader align="center" variant="h5">
          Create Event
        </CardHeader>
        <Box>
          <Typography>Event Title</Typography>
          <TextField
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          ></TextField>
        </Box>
        <Box>
          <Typography>Location</Typography>
          <TextField
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          ></TextField>
        </Box>
        <Box>
          <Typography>Description</Typography>
          <TextField
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          ></TextField>
        </Box>
        <Box>
          <Typography>Start Time (ex. 10 November 2021 20:00)</Typography>
          <TextField
            value={eventStart}
            onChange={(e) => setEventStart(e.target.value)}
          ></TextField>
        </Box>
        <Box>
          <Typography>End Time (ex. 10 November 2021 20:00)</Typography>
          <TextField
            value={eventEnd}
            onChange={(e) => setEventEnd(e.target.value)}
          ></TextField>
        </Box>
        <Box>
          <Typography>Tags</Typography>
          <TextField
            value={tagText}
            onChange={(e) => setTagText(e.target.value)}
          ></TextField>
          <Button onClick={addTag}>Add</Button>
        </Box>
        <Box>
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
      </CardContent>
    </CreateEventCard>
  );
}
export default Create;
