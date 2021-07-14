import {connect} from 'react-redux';

function GroupDetails(props) {
    return (
        <div>
            <h1>{props.group.name}</h1>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        group: state.groups.group
    }
}

export default connect(mapStateToProps)(GroupDetails);