import Button from "./Button"

const Header = (props) => {
    return (
        <header className="header">
            <h1>{props.title}</h1>
            <Button showAddGoal={props.showAddGoal}/>
        </header>
    )
}

export default Header
