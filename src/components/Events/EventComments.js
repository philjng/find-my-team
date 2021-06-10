function EventComments(props) {
    return (
        <div>
            <h1>Comments</h1>
            <ul>
                {props.comments.map( (comment) =>
                <li>
                    <div>
                        <p>{comment.user.name}</p>
                        <p>{comment.text}</p>
                    </div>
                </li>)}
            </ul>
        </div>
    )

}
export default EventComments;