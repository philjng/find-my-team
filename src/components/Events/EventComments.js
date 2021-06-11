import {Container, List, ListItem, Typography} from "@material-ui/core";
import {styled} from "@material-ui/styles";

const ListItem1 = styled(ListItem) ({
    border: '1px solid black',
    margin: '0.5rem'
})

const Typography1 = styled(Typography) ({
    border: '0.5px solid blue',
    color: 'blue',
    width: '20%'
})
function EventComments(props) {
    return (
        <Container>
            <Typography variant = "h2">Comments</Typography>
            <List>
                {props.comments.map( (comment) =>
                <ListItem1 key={JSON.stringify(comment)}>
                    <Container>
                        <Typography1 variant = "body2" >{comment.user.name}</Typography1>
                        <Typography variant = "body1">{comment.text}</Typography>
                    </Container>
                </ListItem1>)}
            </List>
        </Container>
    )

}
export default EventComments;