type InputProps = {
    count: number
}

export default (props: InputProps) => {
    // My compute
    
    return (
        <span> Count: {props.count} </span>
    )
}