import {InputAdornment, TextField} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import {Search} from "@material-ui/icons";
import {useHistory} from "react-router-dom";

const TextFieldSearch = styled(TextField)({
  backgroundColor: `#f8f8ff`,
  marginLeft: `1rem`
});

export const SearchBar = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/Search`)
  }

  return (
    <TextFieldSearch
      variant="outlined"
      size="small"
      placeholder="Search for..."
      InputProps={{
        endAdornment: <InputAdornment position="end"><Search onClick={handleClick}/></InputAdornment>
      }}
    />
  )
}