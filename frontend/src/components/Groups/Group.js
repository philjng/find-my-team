import {Container} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {Button2, SCLink, Typography1} from "../Events/Event";
import TagChips from "../Events/TagChips";

const GroupContainer = styled(Container)({
  "&:hover": {
    background: "#ebfaf7"
  }
})

const Group = (props) => {
  const {group} = props;

  return (
    <GroupContainer>
      <Typography1 variant="h5">{group.name}</Typography1>
      <TagChips genreTags={group.tags}/>
      <Typography1 variant="body2">
        Number of members: {group.groupSize}
      </Typography1>
      <Button2 disableElevation size="small" variant="contained">
        {/*TODO: convert whole card to clickable and have it fetch group data and page*/}
        <SCLink to={`/groups/${group._id}`}>View Group</SCLink>
      </Button2>
    </GroupContainer>
  );
};

export default Group;
