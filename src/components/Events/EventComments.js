import {connect} from 'react-redux';
import {Container, List, ListItem, Typography, TextField, Button} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {addComment, editText} from '../../actions/events.js';

const ListItem1 = styled(ListItem) ({
    border: '1px solid black',
    margin: '0.5rem',
    backgroundColor: 'white'
});

const Typography1 = styled(Typography) ({
    color: 'blue',
    width: '20%'
});

const TextField1 = styled(TextField) ({
    border: '1px solid black',
    height: '20%',
    width: '80%',
    margin: '1rem'
});

const Button1 = styled(Button) ({
    backgroundColor: 'blue',
    margin: '1rem'
})


function EventComments(props) {

    const submitComment = () => {
        props.addComment(props.userId, props.event, props.text);
    }

    const changeText = (event) => {
        props.editText(event.target.value);
    }

    return (
        <Container>
            <Typography variant = "h5">Comments</Typography>
            <List>
                {props.comments.map( (comment) =>
                <ListItem1 key={JSON.stringify(comment)}>
                    <Container>
                        <Typography1 variant = "body2" >{comment.user.name}</Typography1>
                        <Typography variant = "body1">{comment.text}</Typography>
                    </Container>
                </ListItem1>)}
            </List>
            <Container>
                <TextField1 multiline rowsMax={5} placeholder="Write comments here" onChange={changeText}></TextField1>
                <Button1 onClick={submitComment}>Submit</Button1>
            </Container>
        </Container>
    )

}

const mapStateToProps = (state) => {
    return {event: state.events.viewableEvent,
            userId: state.user.user_id,
            text: state.events.commentText};
}

export default connect(mapStateToProps, {addComment: addComment, editText: editText})(EventComments);