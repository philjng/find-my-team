function GenreTags(props) {
    return (
        <div>
            {props.genre.map( (gen) => 
            <button>{gen}</button>)}
        </div>
    )

}
export default GenreTags;