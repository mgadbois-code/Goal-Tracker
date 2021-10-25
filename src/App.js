import GoalList from "./components/GoalList";
import Header from "./components/Header";
import AddGoal from "./components/AddGoal";
import { useState } from "react";
import TaskList from "./components/TaskList";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTask from "./components/AddTask";


function App() {
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)
  const [addToGoal, setAddToGoal] = useState("")
  const [minimizeTasks, setMinimizeTasks] = useState(false)
  const [minimizeGoals, setMinimizeGoals] = useState(false)
  const [goals, setGoals] = useState([ ])

const toggleSubGoals = (id) => {
  setGoals(goals.map((goal) =>{
    if(goal.id === id){
      let newGoal = {...goal, showSubGoals: !goal.showSubGoals}
      console.log(newGoal)
      return newGoal
    }
    
    return goal
  }))
  
}

const toggleDone= (goalId,taskId) => {
  setGoals(goals.map((goal) =>{
    if(goal.id === goalId){
      let tasks= goal.tasks;
      let newTasks = tasks.map((task) => {
        if(task.id === taskId){
          let newTask = {...task, done:!task.done}
          return newTask;
        }
        return task
      })
      let newGoal = {...goal, tasks: newTasks}
      console.log(newGoal)
      return newGoal
    }
    return goal
  }))
  
}

var [goalColor,setGoalColor] = useState("white")
const handleColorChange = () => {

  setGoalColor(goalColor);
  
}

const addGoal = (goal) => {
  goal.id = goals.length+1;
  console.log(goal)
  setGoals([...goals,goal])

}



const handleDropDown = (eventKey,event) => {
  setShowAddTask(!showAddTask)
  setAddToGoal(eventKey)
  console.log(showAddTask);
}

const submitTasks = (taskArr) =>{
  setShowAddTask(!showAddTask)
  let taskObjArr = []
  // console.log(taskArr)
  let targetGoal = goals.filter((goal)=> {return goal.id==addToGoal})[0]
  for(let i = 0; i < taskArr.length; i++){
    taskObjArr.push({id:targetGoal.tasks.length+1+i, title:taskArr[i], done: false})
  }
  console.log(taskObjArr)

  let newTasks = targetGoal.tasks.concat(taskObjArr);
  targetGoal.tasks = newTasks
  let newGoals = [...goals]
  newGoals= newGoals.map((goal) => {
    if(goal.id=== targetGoal.id){
      return targetGoal
    }
    else{
      return goal
    }
  })
  setGoals(newGoals)

}


  
  return (
    <div className="App">

      <div className="container">
        {/* Tasks components */}
        {showAddTask ? <Header buttonColor="red" buttonText="✖️ Never Mind" title="New Task" onAdd={() => (setShowAddTask(!showAddTask))}/> : <Header goals={goals} title="Tasks"  onAdd={handleDropDown} />}
        {showAddTask ? <AddTask addToGoal={addToGoal.id} onSubmit={submitTasks}/> : <TaskList goals={goals} onToggle={toggleDone} />}
      </div>
      <div className = "container">
        {/* Goals components */}
       {showAddGoal ? <Header  buttonColor="red" buttonText="✖️ Never Mind" title="New Goal" onAdd={() => setShowAddGoal(!showAddGoal)}/> :  <Header  buttonColor="green" buttonText="Add"title="Goals" onAdd={() => setShowAddGoal(!showAddGoal)}/>}
        {showAddGoal ? <AddGoal setShowGoals={() => setShowAddGoal(!showAddGoal)} addGoal={addGoal} onChange={handleColorChange} />:
        <GoalList goals={goals}  onToggle ={toggleSubGoals} toggleDone={toggleDone}/>}
      </div>

    </div>
  );
}

export default App;
