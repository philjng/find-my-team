
import {connect} from 'react-redux';
import {viewEventDetails} from "../../actions";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Container, Typography, Box, Button} from "@material-ui/core";
import {styled} from "@material-ui/styles";

const Box2 = styled(Box)({
    border: '1px solid grey', 
    backgroundColor: 'white',
});

const Typography1 = styled(Typography)({
    padding: '0.25rem'
})

const Button2 = styled(Button)({
    background: '#d3d3d3',
    margin: '0.5rem'
}) 

function Event(props) {
    return (
        <Container className = "event_container">
            <Box2>
                <Typography1 variant="h5" className= "event_name">{props.info.name}</Typography1>
                <Typography1 variant="body1" className = "event_location">Location: {props.info.location}</Typography1>
                <Typography1 variant="body2" className = "event_date">Date: {props.info.date.toUTCString()}</Typography1>
                <Button2>
                    <Link to = "/eventdetails" onClick = {() => props.viewEventDetails(props.info)}>Details</Link>
                </Button2>
            </Box2>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {event: state.viewableEvent};
}
export default connect(mapStateToProps, {viewEventDetails})(Event);