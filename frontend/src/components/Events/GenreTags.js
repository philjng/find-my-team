import {Container, Button} from '@material-ui/core';
function GenreTags(props) {
    return (
        <Container>
            {props.genre.map( (gen) => 
            <Button key={gen}>{gen}</Button>)}
        </Container>
    )

}
export default GenreTags;