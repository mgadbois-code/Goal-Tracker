import { useState, useEffect } from "react";
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

  const fetchGoals = async() => {
    const res = await fetch('http://localhost:5000/goals')
    const data = await res.json();

    return data;
  }

  const fetchGoal = async(id) => {
    const res = await fetch(`http://localhost:5000/goals/${id}`)
    const data = await res.json();

    return data;
  }

  useEffect(() => {
    const getGoals = async () => {
      const goalsFromServer = await fetchGoals();
      setGoals(goalsFromServer)
    }
    getGoals()
  }, [])

 //goals = [goal,goal,goal...]
//  goal = {id: 1, title:"",dueDate:"",showSubGoals:bool, color:"", tasks:[task,task...]}  
//task = {id:1, title:"", done:bool}

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

const removeGoal = async (goalId) => {
  await fetch(`http://localhost:5000/goals/${goalId}`, {
    method: 'DELETE',
  })
  setGoals(goals.filter(goal => goal.id != goalId))
  console.log(goals)
}

const removeTask = async (goalId, taskId) => {
  const goalToUpdate = await fetchGoal(goalId)
  const tasks = goalToUpdate.tasks
  const updTasks = tasks.filter(task => task.id != taskId).map((task,index) => {
    task.id = index+1
    return task
  })
  const updGoal = {...goalToUpdate, tasks:updTasks}
  const res = await fetch(`http://localhost:5000/goals/${goalId}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updGoal)
  })

  let data = await res.json()
  console.log(data)

    setGoals(goals.map((goal) =>{
    if(goal.id === goalId){
      let tasks= goal.tasks;
      let newTasks = tasks.filter((task) => {
        return task.id != taskId
      }).map((task,index) => {
        task.id = index + 1
        return task
      })
      let newGoal = {...goal, tasks: newTasks}
      
      return newGoal
    }
    return goal
  }))
  

}



//Toggles checkmark icon in the sugoals in the GoalList component from unchecked icon to checked icon by toggling done property in task object within goal object


const toggleDone= async (goalId,taskId) => {
  const goalToUpdate = await fetchGoal(goalId)
  const tasks = goalToUpdate.tasks;
  const updTasks = tasks.map((task) => {
    if(task.id == taskId){
      console.log(taskId)
      task.done = !task.done
    }
    return task;
  })
  const updGoal = { ...goalToUpdate, tasks:updTasks}

  const res = await fetch(`http://localhost:5000/goals/${goalId}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updGoal)
  })

  const data = await res.json();

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

//When submit button is clicked in addTask component it toggles view, adds the task to the target goal, uses setGoals
const submitTasks = async (taskArr) =>{
 
  setShowAddTask(!showAddTask)
  let taskObjArr = []
  // 
  let targetGoal = goals.filter((goal)=> {return goal.id==addToGoal})[0]
  for(let i = 0; i < taskArr.length; i++){
    taskObjArr.push({id:targetGoal.tasks.length+1+i, title:taskArr[i], done: false})
  }
  

  let newTasks = targetGoal.tasks.concat(taskObjArr);
  targetGoal.tasks = newTasks

  const goalToUpdate = await fetchGoal(addToGoal)
  goalToUpdate.tasks = newTasks;

  const res = await fetch(`http://localhost:5000/goals/${addToGoal}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(goalToUpdate)
  })

  const data = await res.json();


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

//Sets the goal color of a new goal. 
const handleColorChange = () => {
  setGoalColor(goalColor);
  
}

//Creates goal object and adds it to the goals array
const addGoal = async (goal) => {
  const res = await fetch('http://localhost:5000/goals', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(goal)
  })
  const data = await res.json()
  console.log(JSON.stringify(goal))
  
  setGoals([...goals,data])

}



//Toggle view of addTask component and TaskList component when dropdown is clicked and the goal to add to is chosen
const handleDropDown = (eventKey,event) => {
  setShowAddTask(!showAddTask)
  setAddToGoal(eventKey)
  // 
}



  
  return (
    <div className="App">

      <div className="container">
        {/* Tasks components */}
        {showAddTask ? <Header buttonColor="red" buttonText="✖️ Never Mind" title="New Task" onAdd={() => (setShowAddTask(!showAddTask))}/> : <Header goals={goals} title="Tasks"  onAdd={handleDropDown} />}
        {showAddTask ? <AddTask addToGoal={addToGoal.id} onSubmit={submitTasks}/> : <TaskList goals={goals} removeTask={removeTask}  onToggle={toggleDone} />}
      </div>
      <div className = "container">
        {/* Goals components */}
       {showAddGoal ? <Header  buttonColor="red" buttonText="✖️ Never Mind" title="New Goal" onAdd={() => setShowAddGoal(!showAddGoal)}/> :  <Header  buttonColor="green" buttonText="Add"title="Goals" onAdd={() => setShowAddGoal(!showAddGoal)}/>}
        {showAddGoal ? <AddGoal setShowGoals={() => setShowAddGoal(!showAddGoal)} addGoal={addGoal} onChange={handleColorChange} />:
        <GoalList goals={goals}  removeGoal={removeGoal} onToggle ={toggleSubGoals} toggleDone={toggleDone}/>}
      </div>

    </div>
  );
}

export default App;
