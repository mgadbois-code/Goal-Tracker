const Task = (props) => {
    return (
        
        <div className="item task" style={{backgroundColor: props.goal.color}} onClick={(event) =>props.onToggle(props.goal.id,props.task.id)}>
            <h3 className="detail" style={{opacity:"2"}}>{props.task.title}</h3>
        </div>
        
    )
}

export default Task
