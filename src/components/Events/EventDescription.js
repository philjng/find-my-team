import {Container, Typography} from "@material-ui/core";
function EventDescription(props) {
    return (
        <Container>
            <Typography variant="h2">Description</Typography>
            <Typography variant="body1">{props.description}</Typography>
        </Container>
    )

}
export default EventDescription;