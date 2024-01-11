import "./eye.css"
import EyeElems from "./eyeelems.jsx"

function Eye(props){
    
    const game_count = props.homedata.game_count
    const matchups = props.homedata.matchups
    let elems = []
    for (let i = 0; i < game_count; i++){
        elems.push(<EyeElems  key={i} matchups={matchups} index={i}/>)
    }

    return(
        <li className="ele eyedropdown_wrapper">
            <img src="assets/navbar/eye.svg" className="eye" />
            <ul className="eyedropdown">
                {elems}
            </ul>
        </li>
    )
}



export default Eye