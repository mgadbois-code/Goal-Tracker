import SubGoal from "./SubGoal"
const Goal = (props) => {

    //order Tasks by whether they are done
    const doneTasks = props.goal.tasks.filter((task) => task.done)
    const undoneTasks = props.goal.tasks.filter((task) => !task.done)
    const tasks=doneTasks.concat(undoneTasks)

    return (
        <div className="item pointer" onClick={() => props.onToggle(props.goal.id)}>
            <h3 className="detail" onClick={() => props.onToggle(props.goal.id)}>{props.goal.title}</h3>
            {props.goal.dueDate !=="" && <h4 onClick={() => props.onToggle(props.goal.id)} className="detail">Due: {props.goal.dueDate} </h4>}
            <div className="flex" >
            {!props.goal.showSubGoals && tasks.map((task) =>{
                if(task.done){
                    return <p>✅</p>
                }
                return <p>⬜</p>
            })}
            </div>
            {props.goal.showSubGoals && <SubGoal goal={props.goal} toggleDone={props.toggleDone} tasks={tasks}/>}
        </div>
    )
}

export default Goal
