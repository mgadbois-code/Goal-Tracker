import { useState } from "react"

import Goal from "./Goal"
const GoalList = (props) => {
    
    return (
        <div>
           { props.goals.map((goal) => <Goal toggleDone = {props.toggleDone} goal= {goal} onToggle={props.onToggle}/>)}
        </div>
    )
}

export default GoalList
