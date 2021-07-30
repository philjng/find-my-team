import { Container, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
function UserListing(props) {
  return (
    <Container>
      <Typography>{props.user.displayName}</Typography>
      <Button>
        <Link to={`/profile/${props.user._id}`}>Profile</Link>
      </Button>
    </Container>
  );
}
export default UserListing;
