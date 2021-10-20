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
  const [goals, setGoals] = useState(
    [
        {
          id: 1,
          title:"Elephant Essay",
          dueDate:"10/30/20",
          tasks:[{id:1,title:"Research", done:true},{id:2,title:"First Draft", done:false},{id:3,title:"Create Outline", done:true},{id:4,title:"Edit", done:false},{id:5,title:"Final Draft", done:false}],
          showSubGoals: false,
          color: "#def"
        },
        {
          id: 2,
          title: "React App",
          dueDate: "",
          tasks: [{id:1,title:"Design UI", done:true},{id:2,title:"Create Components", done:false},{id:3,title:"Finish front-end", done:false}],
          showSubGoals: false,
          color: "#fab"
        }
      ]
)

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
  console.log(eventKey);
}

const submitTasks = (taskArr) =>{
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
        <Header goals={goals} title="Tasks"  onAdd={handleDropDown} />
        {showAddTask ? <AddTask addToGoal={addToGoal.id} onSubmit={submitTasks}/> : <TaskList goals={goals} onToggle={toggleDone} />}
      </div>
      <div className = "container">
        {/* Goals components */}
       {showAddGoal ? <Header  buttonColor="red" buttonText="✖️ Never Mind" title="New Goal" onAdd={() => setShowAddGoal(!showAddGoal)}/> :  <Header  buttonColor="green" buttonText="Add"title="Goals" onAdd={() => setShowAddGoal(!showAddGoal)}/>}
        {showAddGoal ? <AddGoal addGoal={addGoal} onChange={handleColorChange} />:
        <GoalList goals={goals}  onToggle ={toggleSubGoals} toggleDone={toggleDone}/>}
      </div>
    </div>
  );
}

export default App;
