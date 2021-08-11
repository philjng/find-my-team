import {Chip, Box} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {useHistory} from "react-router-dom";
import {setSearch} from "../../actions/search";
import { connect } from "react-redux";

const TagChip = styled(Chip)({
  "&:hover": {
    cursor: "pointer"
  },
  marginRight: `0.5rem`,
  backgroundColor: `#339999`,
  color: `white`
})

function TagChips(props) {
  const { setSearch } = props;
  const history = useHistory();

  const handleClick = (tag) => {
    setSearch(tag);
    history.push(`/search`);
  }

  return (
    <Box>
      {props.tags.map((tag) => (
        <TagChip
          label={tag}
          size="small"
          key={tag}
          onClick={() => handleClick(tag)}
        />
      ))}
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSearch: (searchText) => dispatch(setSearch(searchText))
  }
}

export default connect(null, mapDispatchToProps)(TagChips);
