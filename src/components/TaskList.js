import Task from "./Task";
import Goal from "./Goal";

const TaskList = (props) => {
    return (
        <div>
            { props.goals.map((goal) => goal.tasks.filter((task) => !task.done).map((task) => <Task onToggle={props.onToggle}  goal= {goal} task={task} />))}
        </div>
    )
}

export default TaskList
