import { useEffect, useState } from "react"
import "./eye.css"

function EyeNavItem({homedata, itemprops, control_eyenavitem_state}){
    
    return(
        <li className={`navitem ${itemprops.alignment} eyenav`}>
        <img src={itemprops.imgsrc}></img>
        <EyeNavDropDown homedata={homedata} control_eyenavitem_state={control_eyenavitem_state}/>
        </li>
    )
}

function EyeNavDropDown({homedata, control_eyenavitem_state}){
    
    const init_togglestates = []
    for (let i = 0; i < homedata.game_count; i++){
        init_togglestates.push(false)
    }

    const [togglestates, setTogglestates] = useState(init_togglestates)
    // false == visible, true == hidden
    
    function toggle_visibility(index){
        setTogglestates((togglestates) => {
            const new_togglestates = [...togglestates]
            new_togglestates[index] = !togglestates[index]
            return new_togglestates
        })
    }

    function all_toggle_visibility(){
        const equality = arr => arr.every(val => val === arr[0])
        const invert = arr => arr.map(val => !val)
        const toggle_remaining_visible = arr => arr.map(val => !val ? !val : val)

        setTogglestates(() => {
            const new_togglestates = [...togglestates]
            if (equality(new_togglestates)){
                return invert(new_togglestates)
            }
            else{
                return toggle_remaining_visible(new_togglestates)
            }
        })
    }
    
    const items = []
    for (let i = 0; i < homedata.game_count; i++){
        items.push(<EyeNavDropDownItem homedata={homedata} index={i} key={i} togglestate={togglestates[i]} toggle_visibility={toggle_visibility} all_toggle_visibility={all_toggle_visibility} control_eyenavitem_state={control_eyenavitem_state}/>)
    }
    
    return(
    <ul className="eyenavdropdown">
        {items}
    </ul>
    )
}

function EyeNavDropDownItem({homedata, index, togglestate, toggle_visibility, all_toggle_visibility, control_eyenavitem_state}){
    const matchups = homedata.matchups
    
    useEffect(() => {
        const eyenavdropdownitem = document.getElementById("eyenavdropdownitem" + index)
        const score1 = document.getElementById("match/" + index).children[0].children[0]
        const score2 = document.getElementById("match/" + index).children[2].children[1]

        
        if (togglestate){
            control_eyenavitem_state("hidden", index)

            // score1.style.visibility = "hidden"
            // score2.style.visibility = "hidden"
            // eyenavdropdownitem.classList.remove("eye_visible")
            // eyenavdropdownitem.classList.add("eye_hidden")
        }
        else{
            control_eyenavitem_state("visible", index)
 
            // score1.style.visibility = "visible"
            // score2.style.visibility = "visible"
            // eyenavdropdownitem.classList.remove("eye_hidden")
            // eyenavdropdownitem.classList.add("eye_visible")
        }
        
    }, [togglestate])

    return(
        <>
        {index == 0 ? <li className="eyenavdropdownitem eyeall" onClick={all_toggle_visibility}>ALL</li>: null}
        <li id={"eyenavdropdownitem" + index} className={`eyenavdropdownitem ${togglestate ? "eye_hidden" : "eye_visible"}`} onClick={() => {toggle_visibility(index)}}>
            {matchups[index][0]} vs {matchups[index][1]}
        </li>
        </>
    )
}



export default EyeNavItem



