import { Card, CardContent } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Button2, SCLink, Typography1 } from "../Events/Event";

const GroupCard = styled(Card)({
    backgroundColor: `#f7fdfc`,
    margin: `1rem`
})

const Group = (props) => {
  const { group } = props;

  return (
    <GroupCard>
      <CardContent>
        <Typography1 variant="h5">{group.name}</Typography1>
        <Typography1 variant="body1">Tags: {group.tags.join(", ")}</Typography1>
        <Typography1 variant="body2">
          Number of members: {group.groupSize}
        </Typography1>
        <Button2 disableElevation size="small" variant="contained">
          {/*TODO: convert whole card to clickable and have it fetch group data and page*/}
          <SCLink to={`/groups/${group._id}`}>View Group</SCLink>
        </Button2>
      </CardContent>
    </GroupCard>
  );
};

export default Group;
