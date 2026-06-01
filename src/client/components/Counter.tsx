type InputProps = {
    count: number
}

const Counter = (props: InputProps) => {
    return (
        <span id="counter">Count: {props.count}</span>
    )
}

export default Counter