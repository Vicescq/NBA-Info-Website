import "./eyeelems.css"

function EyeElems(props){
    const matchups = props.matchups
    const index = props.index

    return(
        <a className="eyematch">
            {matchups[index][0]} vs {matchups[index][1]}
            
        </a>
    )

}

// function eleclick(){
//     window.event
// }

export default EyeElems