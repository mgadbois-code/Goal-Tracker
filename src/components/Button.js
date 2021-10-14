const Button = (props) => {
    return (
        <div>
            <button className="btn" style={{backgroundColor: props.color}} onClick={props.onClick}>{props.text}</button>
        </div>
    )
}

export default Button
