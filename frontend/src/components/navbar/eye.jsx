import { useContext, useEffect, useState } from "react"
import useEyeStates  from "../../hooks/useEyeStates"
import "./eye.css"
import { EyeStatesContext } from "../../pages/home"

function EyeNavItem({homedata, itemprops, useEyeStates}){
    
    return(
        <li className={`navitem ${itemprops.alignment} eyenav`}>
        <img src={itemprops.imgsrc}></img>
        <EyeNavDropDown homedata={homedata} useEyeStates={useEyeStates}/>
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

    return(
        <>
        {index == 0 ? <li className="eyenavdropdownitem eyeall" onClick={() => all_toggle_visibility()}>ALL</li>: null}
        <li id={"eyenavdropdownitem" + index} className="eyenavdropdownitem" onClick={() => toggle_visibility(index, eyestates)}>
            {matchups[index][0]} vs {matchups[index][1]}
        </li>
        </>
    )
}



export default EyeNavItem



