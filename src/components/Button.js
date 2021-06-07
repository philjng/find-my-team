import {setVal} from '../actions';
import {connect} from 'react-redux';
function Button(props) {
    return (
        <div>
            <button onClick = { () => props.setVal(23)}>Click</button>
            <p>Number: {props.value}</p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {value: state.orig_val};
}

export default connect(mapStateToProps, {setVal})(Button);