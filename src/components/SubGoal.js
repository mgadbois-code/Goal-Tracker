function SubGoal(props) {
    return (
        <div>
            <ul>
            {props.tasks.map((task) => <li onClick={(event) => {
                event.stopPropagation();
                props.toggleDone(props.goal.id,task.id)}} className={`done-${task.done}`}>{task.title}</li>)}
            </ul>
            
        </div>
    )
}

export default SubGoal
