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
          id: firebase.auth().currentUser.uid,
          email: firebase.auth().currentUser.email,
        },
      })
      .then((result) => {
        console.log("success");
        setEventTitle("");
        setEventLocation("");
        setEventDescription("");
        setEventStart("");
        setEventEnd("");
        setTags([]);
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
          <Typography>Start Time (ex. 10 November 2021 20:00)</Typography>
          <Input
          variant="filled"
          size="small"
            value={eventStart}
            onChange={(e) => setEventStart(e.target.value)}
          ></Input>
        </Box>
        <Box>
          <Typography>End Time (ex. 10 November 2021 20:00)</Typography>
          <Input
          variant="filled"
          size="small"
            value={eventEnd}
            onChange={(e) => setEventEnd(e.target.value)}
          ></Input>
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
export default Create;