import {Search} from "@material-ui/icons";
import {useHistory} from "react-router-dom";

function SearchButton(props) {
    const history = useHistory();
    const handleClick = () => {
        history.push("/Search")
    }
    return (
                <Search onClick={handleClick}/>
    )

}
export default SearchButton;