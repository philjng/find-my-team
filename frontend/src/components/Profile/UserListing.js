import { Card, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import {styled} from "@material-ui/styles";
const UserContainer = styled(Card)({
  borderRadius: "0.25rem",
  width: "80%",
  margin: "auto",
  backgroundColor: "#d6f5ef"

})
function UserListing(props) {
  return (
    <UserContainer>
      <Typography>{props.user.displayName}</Typography>
      <Button>
        <Link to={`/profile/${props.user._id}`}>Profile</Link>
      </Button>
    </UserContainer>
  );
}
export default UserListing;
