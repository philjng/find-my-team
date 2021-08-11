import {Container} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {Typography1} from "../Events/Event";
import TagChips from "../Events/TagChips";
import {useHistory} from "react-router-dom";

export const ItemContainer = styled(Container)({
  "&:hover": {
    background: "#ebfaf7",
    cursor: "pointer"
  },
  marginBottom: "1rem"
})

const Group = (props) => {
  const {group} = props;
  const history = useHistory();

  const handleClick = (e) => {
    const notTag = !e.target.className.includes("MuiChip-label");
    notTag && history.push(`/groups/${group._id}`)
  }

  return (
    <ItemContainer disableGutters={props.isMainList} onClick={handleClick}>
      <Typography1 variant="h5">{group.name}</Typography1>
      <TagChips tags={group.tags}/>
      <Typography1 variant="body2">
        Number of members: {group.groupSize}
      </Typography1>
    </ItemContainer>
  );
};

export default Group;
