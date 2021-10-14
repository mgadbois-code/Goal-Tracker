import GoalList from "./components/GoalList";
import Header from "./components/Header";
import AddGoal from "./components/AddGoal";
import { useState } from "react";
import TaskList from "./components/TaskList";

function App() {
  const [showAddGoal, setShowAddGoal] = useState(false)
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
  
  return (
    <div className="App">
      <div className="container">
        <Header title="Tasks" onAdd={() => setShowAddGoal(!showAddGoal)} />
        <TaskList goals={goals} onToggle={toggleDone} />
      </div>
      <div className = "container">
        <Header  buttonColor="red" buttonText="❌ Never Mind"title="Goals" onAdd={() => setShowAddGoal(!showAddGoal)}/>
        {showAddGoal ? <AddGoal onChange={handleColorChange} />:
        <GoalList goals={goals}  onToggle ={toggleSubGoals} toggleDone={toggleDone}/>}
      </div>
    </div>
  );
}

export default App;
