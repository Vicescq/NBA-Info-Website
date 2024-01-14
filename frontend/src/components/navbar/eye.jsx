import { useEffect, useState } from "react"
import "./eye.css"

function EyeNavItem(props){
    const homedata = props.homedata
    const itemprops = props.itemprops
    return(
        <li className={`navitem ${itemprops.alignment} eyenav`}>
        <a>
        <img src={itemprops.imgsrc}></img>
        </a>
        <EyeNavDropDown homedata={homedata}/>
        </li>
    )
}

function EyeNavDropDown(props){
    if (props.homedata != undefined){ // home, eye dropdown
        const homedata = props.homedata
        const items = []
        for (let i = 0; i < homedata.game_count; i++){
            items.push(<EyeNavDropDownItem matchups={homedata.matchups} index={i} key={i}/>)
        }
        
        return(
        <ul className="eyenavdropdown">
            {items}
        </ul>
        )
    }
}

function EyeNavDropDownItem(props){
    const [pressed, setPressed] = useState(1)
    const matchups = props.matchups
    const index = props.index
    const item_onclick = pressed => {
        setPressed(!pressed)
    }

    // useEffect(() => {
    //     if (pressed == 1){

    //     }
    // }, [pressed])


    return(
        <>
        {index == 0 ? <li className="eyenavdropdownitem eyeall" onClick={eyenavitem_change_css}>ALL</li>: null}
        <li className="eyenavdropdownitem" onClick={() => {item_onclick(pressed)}}>
            {matchups[index][0]} vs {matchups[index][1]}
        </li>
        </>
    )
}

function eyenavitem_change_css(event){
    const curr_element = event.currentTarget
    curr_element.style.backgroundColor = "lightblue"
    
}

export default EyeNavItem



