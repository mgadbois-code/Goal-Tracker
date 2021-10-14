import { useState } from "react"
import { HuePicker, SliderPicker } from "react-color"

import Button from "./Button"

// plus-btn needs to add tasks to taskArr, submit button needs to create a new goal object with the info and add it to goals in App.js
// need a method that takes the task name in the task field and creates a new task object and adds it to taskArr

const AddGoal = (props) => {
    var [goalName,setGoalName] = useState("")
    var [dueDate,setDueDate] = useState("")
    var [taskName, setTaskName] = useState("")
    var [taskArr, setTaskArr] = useState([])
    var [color,setColor] = useState("green")
    const addTask = (event) => {
        event.preventDefault()
        setTaskArr([...taskArr,{key:taskArr.length+1, title:taskName, done:false}])
        console.log(taskArr)
        setTaskName("")
    }

    const changeColor = (color,event) =>{
        setColor(color.hex)
        props.onChange();

        console.log(color.hex)

    }
    return (
        <form className="goal-form-container">
            <div className="goal-form">
                <div className= "add-field">
                    <label>Goal Name: </label>
                    <input type="text" value={goalName}  onChange={(event) => {setGoalName(event.target.value)}} placeholder="Goal Title" />
                </div>
                <div className= "add-field">
                    <label>Due Date (optional): </label>
                    <input type="text" value={dueDate} onChange={(event) => setDueDate(event.target.value)} placeholder="Due Date"/>
                </div>
                <div style={{display: "flex", alignItems:"center"}}>
                        <label style={{marginRight: 5}}>Tasks: </label>
                        <input type="text" value={taskName} onChange= {(event) => setTaskName(event.target.value)} placeholder="Add Task"/>
                        <button onClick={(event) => addTask(event)} className="plus-btn"> ➕ </button>
                </div>
                <ul>
                    {taskArr.map((task)=> <li>{task.title}</li>)}
                </ul>
            </div>
            <div className="goal-form">
                <div className= "add-field" >
                    <label>Choose Color:</label>
                    <div className="hue-picker">
                    <HuePicker width="auto" color="ggg" onChange={(color,event) => changeColor(color,event)} />
                    </div>
                    <div style={{marginTop:"10px"}}>
                        <Button  text="Submit Goal" color={color}/>
                    </div>
                </div>
            </div>

        </form>
    )
}

export default AddGoal
