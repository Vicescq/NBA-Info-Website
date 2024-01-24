import { useContext, useEffect, useState } from "react"
import "./eye.css"
import { EyeStatesContext } from "../../pages/home"

function EyeNavItem({homedata, itemprops}){
    
    return(
        <li className={`navitem ${itemprops.alignment} eyenav`}>
        <img src={itemprops.imgsrc}></img>
        <EyeNavDropDown homedata={homedata}/>
        </li>
    )
}

function EyeNavDropDown({homedata}){
    const items = []
    for (let i = 0; i < homedata.game_count; i++){
        items.push(<EyeNavDropDownItem homedata={homedata} index={i} key={i}/>)
    }
    
    return(
    <ul className="eyenavdropdown">
        {items}
    </ul>
    )
}

function EyeNavDropDownItem({homedata, index}){
    const matchups = homedata.matchups
    const [eyestates, toggle_visibility, all_toggle_visibility] = useContext(EyeStatesContext)
    const eye_class = eyestates[index] ? "eye_hidden" : "eye_visible"

    return(
        <>
        {index == 0 ? <li className="eyenavdropdownitem eyeall" onClick={() => all_toggle_visibility()}>ALL</li>: null}
        <li className={`eyenavdropdownitem ${eye_class}`} onClick={() => toggle_visibility(index, eyestates)}>
            {matchups[index][0]} vs {matchups[index][1]}
        </li>
        </>
    )
}



export default EyeNavItem



