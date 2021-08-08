import {Container} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {Typography1} from "../Events/Event";
import TagChips from "../Events/TagChips";
import {useHistory} from "react-router-dom";

const GroupContainer = styled(Container)({
  "&:hover": {
    background: "#ebfaf7",
    cursor: "pointer"
  }
})

const Group = (props) => {
  const {group} = props;
  const history = useHistory()

  const handleClick = () => {
    history.push(`/groups/${group._id}`)
  }

  return (
    <GroupContainer onClick={handleClick}>
      <Typography1 variant="h5">{group.name}</Typography1>
      <TagChips genreTags={group.tags}/>
      <Typography1 variant="body2">
        Number of members: {group.groupSize}
      </Typography1>
    </GroupContainer>
  );
};

export default Group;
