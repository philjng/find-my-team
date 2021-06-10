function EventComments(props) {
    return (
        <div>
            <h1>Comments</h1>
            {props.comments.map( (comment) =>
            <div>
                <p>{comment.user.name}</p>
                <p>{comment.text}</p>
            </div>)}
        </div>
    )

}
export default EventComments;