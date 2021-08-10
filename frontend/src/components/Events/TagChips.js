import {Chip, Box} from "@material-ui/core";
import {styled} from "@material-ui/styles";

const TagChip = styled(Chip)({
  marginRight: `0.5rem`,
  backgroundColor: `#339999`,
  color: `white`
})

function TagChips(props) {
  return (
    <Box>
      {props.tags.map((tag) => (
        <TagChip
          label={tag}
          size="small"
          key={tag}
        />
      ))}
    </Box>
  );
}
export default TagChips;
