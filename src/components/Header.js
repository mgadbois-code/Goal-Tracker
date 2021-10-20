import Button from "./Button"
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'



const Header = (props) => {
    return (
        <header className="header">
            <h1>{props.title}</h1>
           {props.title!=="Tasks" &&
            <Button text ={props.buttonText} color={props.buttonColor} showAddGoal={props.showAddGoal} onClick={props.onAdd}/>}
           {props.title==="Tasks" &&
           <DropdownButton onSelect={props.onAdd} id="drop-down" title="Add">
          { props.goals.map(goal => <Dropdown.Item  eventKey={goal.id} href="#/action-1">{goal.title}</Dropdown.Item>)}
         </DropdownButton>}
        </header>
    )
}

export default Header
