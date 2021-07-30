import {TextField, Container, Button} from "@material-ui/core";
import {useState} from "react";
import {searchEvents} from "../../actions/events";
import { connect } from "react-redux";
function Search(props) {
    const [searchText, setSearchText] = useState("");

    const performSearch = () => {
        console.log("TODO");
    }

    return (
        <Container>
            <TextField value={searchText} onChange={(e) => setSearchText(e.target.value)}>Search</TextField>
            <Button onClick={performSearch}>Search</Button>
        </Container>
    )

}

const mapStateToProps = (state) => {
    return { searchResults: state.searchResults };
  };
  export default connect(mapStateToProps, { searchEvents })(Search);