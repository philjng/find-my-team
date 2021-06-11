import {Container, List, ListItem, Typography, Box} from "@material-ui/core";
function EventComments(props) {
    return (
        <Container>
            <Typography variant = "h2">Comments</Typography>
            <List>
                {props.comments.map( (comment) =>
                <ListItem key={JSON.stringify(comment)}>
                    <Container>
                        <Typography variant = "body2">{comment.user.name}</Typography>
                        <Typography variant = "body1">{comment.text}</Typography>
                    </Container>
                </ListItem>)}
            </List>
        </Container>
    )

}
export default EventComments;