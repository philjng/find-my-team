import {InputAdornment, TextField} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import {Search} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import {useState} from "react";
import { connect } from "react-redux";
import {setSearch} from "../../actions/search";

const TextFieldSearch = styled(TextField)({
  backgroundColor: `#f8f8ff`,
  marginLeft: `1rem`
});

const SearchIcon = styled(Search)({
  "&:hover": {
    cursor: "pointer"
  }
})

const SearchBar = (props) => {
  const { setSearch } = props;
  const history = useHistory();
  const [searchText, setSearchText] = useState("");

  const handleClick = () => {
    setSearch(searchText);
    history.push(`/search`);
  }

  return (
    <TextFieldSearch
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      variant="outlined"
      size="small"
      placeholder="Search for..."
      InputProps={{
        endAdornment: <InputAdornment position="end">
          <SearchIcon onClick={handleClick}/>
        </InputAdornment>
      }}
    />
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSearch: (searchText) => dispatch(setSearch(searchText))
  }
}

export default connect(null, mapDispatchToProps)(SearchBar)