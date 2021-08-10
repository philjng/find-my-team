import { connect } from "react-redux";
import {
  Container,
  List,
  ListItem,
  Typography,
  TextField,
  Button, Box,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { addComment } from "../../actions/events.js";
import "firebase/auth";
import { useState } from "react";

const ListItem1 = styled(ListItem)({
  borderLeft: "1px solid #2c698d",
  margin: "0.5rem 0",
  width: "fit-content"
});

const Typography1 = styled(Typography)({
  color: "#339999",
  width: "20%",
});

const TextField1 = styled(TextField)({
  width: "60%",
  margin: "1rem 0",
});

const Button1 = styled(Button)({
  margin: "1rem",
});

function EventComments(props) {
  const [textComment, setTextComment] = useState("");

  const { user } = props;

  const submitTextComment = () => {
    props.addComment(props.eventId, user.displayName, textComment);
    setTextComment("");
  };

  const changeTextComment = (event) => {
    setTextComment(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h5">Comments</Typography>
      <List>
        {props.comments.map((comment) => (
          <ListItem1 key={JSON.stringify(comment)}>
            <Container>
              <Typography1 variant="body1">{comment.user}</Typography1>
              <Typography variant="body2">{comment.text}</Typography>
            </Container>
          </ListItem1>
        ))}
      </List>
      <Container>
        <TextField1
          multiline
          rowsMax={5}
          placeholder="Add a comment"
          value={textComment}
          onChange={changeTextComment}
          variant="outlined"
          size="small"
        />
        <Button1 disableElevation variant="contained" color="primary" onClick={submitTextComment}>Submit</Button1>
      </Container>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    event: state.events.viewableEvent,
    user: state.user,
    text: state.events.commentText,
    events: state.events.events,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (eventId, user, text) =>
      addComment(dispatch, eventId, user, text),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventComments);
