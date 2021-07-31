import {Search} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import {styled} from "@material-ui/styles";

const SearchIcon = styled(Search)({
    margin: `auto`,
    marginLeft: '1rem',
    marginRight: '1rem'
})
function SearchButton(props) {
    const history = useHistory();
    const handleClick = () => {
        history.push("/Search")
    }
    return (
                <SearchIcon onClick={handleClick}/>
    )

}
export default SearchButton;