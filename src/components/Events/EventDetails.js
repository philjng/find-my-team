import {connect} from 'react-redux';
import GenreTags from './GenreTags.js';
import EventDescription from './EventDescription.js';
import EventParticipants from './EventParticipants.js';
import EventComments from './EventComments';
import {Container, Typography, Box, Button} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import { participantJoin} from '../../actions/events.js';

const Box1 = styled(Box)({
    border: '2px solid #3f51b5', 
    backgroundColor: 'white',
    alignContent: 'center'
});

const Box2 = styled(Box)({
    border: '1px solid #3f51b5', 
    backgroundColor: '#f7fcfc',
    width: '80%',
    margin: 'auto',
    marginTop: '1rem',
    maxHeight: '25%',
    overflow: 'auto'
});

const Button1 = styled(Button)({
    float: 'right'
})

function EventDetails(props) {
    console.log("rerender");
    return (
        <Container>
            <Typography variant="h1">{props.event.name}</Typography>
            <Container>
                <Button1 onClick = {() => props.participantJoin({name: props.userId}, props.event)}>Join</Button1>
                <Typography variant="h5">{props.event.location}</Typography>
                <Typography variant="h5">{props.event.date.toUTCString()}</Typography>
            </Container>
            <Box1>
                <Container>
                    <GenreTags genre={props.event.genre}/>
                </Container>
                <Box2>
                    <EventDescription description={props.event.description}/>
                </Box2>
                <Box2>
                    <EventParticipants participants = {props.event.participants}/>
                </Box2>
                <Box2>
                    <EventComments comments = {props.event.comments}/>
                </Box2>
            </Box1>
        </Container>
    )
    }
    const mapStateToProps = (state) => {
        return {event: state.events.viewableEvent,
            userId: state.user.user_id};
    }

    export default connect(mapStateToProps, {participantJoin})(EventDetails);