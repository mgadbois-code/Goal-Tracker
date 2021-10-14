const Task = (props) => {
    return (
        <div className="item" style={{backgroundColor: props.goal.color }} onClick={(event) =>props.onToggle(props.goal.id,props.task.id)}>
            <h3 className="detail">{props.task.title}</h3>
        </div>
    )
}

export default Task
