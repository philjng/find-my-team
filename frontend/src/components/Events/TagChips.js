import {Chip, Box} from "@material-ui/core";
import {styled} from "@material-ui/styles";

const TagChip = styled(Chip)({
  marginRight: `0.5rem`
})

function TagChips(props) {
  return (
    <Box>
      {props.genreTags.map((tag) => (
        <TagChip
          label={tag}
          color="primary"
          size="small"
          key={tag}
        />
      ))}
    </Box>
  );
}
export default TagChips;