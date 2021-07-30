import { Typography, Box } from "@material-ui/core";
import { styled } from "@material-ui/styles";


const Typography1 = styled(Typography)({
  padding: "0.25rem 0",
});

function EventDescription(props) {
  return (
    <Box>
      <Typography variant="h5">Description</Typography>
      <Box>
        <Typography1>{props.description}</Typography1>
      </Box>
    </Box>
  );
}
export default EventDescription;
