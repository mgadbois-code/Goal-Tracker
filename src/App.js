import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import AddGoal from "./components/AddGoal";
import GoalList from "./components/GoalList";


function App() {
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)
  const [addToGoal, setAddToGoal] = useState("")
  const [minimizeTasks, setMinimizeTasks] = useState(false)
  const [minimizeGoals, setMinimizeGoals] = useState(false)
  const [goals, setGoals] = useState([ ])
  const [goalColor,setGoalColor] = useState("white")

// used in GoalList component to toggle view of tasks in a goal with checkmarks
const toggleSubGoals = (id) => {
  setGoals(goals.map((goal) =>{
    if(goal.id === id){
      let newGoal = {...goal, showSubGoals: !goal.showSubGoals}
      
      return newGoal
    }
    
    return goal
  }))
  
}

//Toggles checkmark icon in the sugoals in the GoalList component from unchecked icon to checked icon
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
      
      return newGoal
    }
    return goal
  }))
  
}

//Sets the goal color of a new goal. 
const handleColorChange = () => {
  setGoalColor(goalColor);
  
}

//Creates goal object and adds it to the goals array
const addGoal = (goal) => {
  goal.id = goals.length+1;
  
  setGoals([...goals,goal])

}


//Toggle view of addTask component and TaskList component when dropdown is clicked and the goal to add to is chosen
const handleDropDown = (eventKey,event) => {
  setShowAddTask(!showAddTask)
  setAddToGoal(eventKey)
  // 
}

//When submit button is clicked in addTask component it toggles view, adds the task to the target goal, uses setGoals
const submitTasks = (taskArr) =>{
  setShowAddTask(!showAddTask)
  let taskObjArr = []
  // 
  let targetGoal = goals.filter((goal)=> {return goal.id==addToGoal})[0]
  for(let i = 0; i < taskArr.length; i++){
    taskObjArr.push({id:targetGoal.tasks.length+1+i, title:taskArr[i], done: false})
  }
  

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
