import {Typography, ListItem} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {styled} from "@material-ui/styles";
import CloudinaryAvatar from "../shared-components/CloudinaryAvatar";

const Person = styled(ListItem)({
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#f7fdfc"
  },
  display: "flex",
  flexDirection: "column",
  marginRight: "1rem",
  backgroundColor: "#f7fdfc",
  width: "100px",
  height: "100px",
});

function UserSquare(props) {
  const { user } = props;
  const history = useHistory();

  const handleClick = (user) => {
    history.push(`/profile/${user._id}`)
  }

  return (
    <Person onClick={() => {handleClick(user)}}>
      <CloudinaryAvatar
        publicId={user.image}
        size={40}
      />
      <Typography>{user.displayName}</Typography>
    </Person>
  );
}
export default UserSquare;
