import Button from "./Button"

const Header = (props) => {
    return (
        <header className="header">
            <h1>{props.title}</h1>
            <Button text ="Add" color="green" showAddGoal={props.showAddGoal} onClick={props.onAdd}/>
        </header>
    )
}

export default Header
