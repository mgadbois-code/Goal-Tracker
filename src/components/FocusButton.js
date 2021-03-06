import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'



const FocusButton = ({toggleVisible, goalId, visible}) => {
    return (
        <div style={{paddingLeft:"20px"}}>
            {visible && <FontAwesomeIcon icon={faEye} onClick = {(event) => {event.stopPropagation(); toggleVisible(goalId);}} />}
            {!visible && <FontAwesomeIcon icon={faEyeSlash} onClick = {(event) => {event.stopPropagation(); toggleVisible(goalId);}} />}
        </div>
    )
}

export default FocusButton
