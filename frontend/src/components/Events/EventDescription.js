import { Container, Typography, Box } from "@material-ui/core";
import { styled } from "@material-ui/styles";

const Box1 = styled(Box)({
  border: "0.5px solid grey",
  margin: "0.5rem",
  backgroundColor: "white",
});

const Typography1 = styled(Typography)({
  padding: "0.25rem",
});

function EventDescription(props) {
  return (
    <Container>
      <Typography variant="h5">Description</Typography>
      <Box1>
        <Typography1 variant="body2">{props.description}</Typography1>
      </Box1>
    </Container>
  );
}
export default EventDescription;
