import { useEffect, useState } from "react"
import "./eye.css"

function EyeNavItem({homedata, itemprops}){
    
    return(
        <li className={`navitem ${itemprops.alignment} eyenav`}>
        <img src={itemprops.imgsrc}></img>
        <EyeNavDropDown homedata={homedata}/>
        </li>
    )
}

function EyeNavDropDown({homedata}){
    
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
        items.push(<EyeNavDropDownItem homedata={homedata} index={i} key={i} togglestate={togglestates[i]} toggle_visibility={toggle_visibility} all_toggle_visibility={all_toggle_visibility}/>)
    }
    
    return(
    <ul className="eyenavdropdown">
        {items}
    </ul>
    )
}

function EyeNavDropDownItem({homedata, index, togglestate, toggle_visibility, all_toggle_visibility}){
    const matchups = homedata.matchups
    const [initload, setInitload] = useState(true)
    

    
    
    
    useEffect(() => {
        const eyenavdropdownitem = document.getElementById("eyenavdropdownitem" + index)
        const score1 = document.getElementById("match/" + index).children[0].children[0]
        const score2 = document.getElementById("match/" + index).children[2].children[1]
        let vis_state
                
        if (togglestate){
            score1.style.visibility = "hidden"
            score2.style.visibility = "hidden"
            eyenavdropdownitem.classList.remove("eye_visible")
            eyenavdropdownitem.classList.add("eye_hidden")
            sessionStorage.setItem("scorevis" + index, "hidden")
        }
        else{
            if(!initload){
                score1.style.visibility = "visible"
                score2.style.visibility = "visible"
                eyenavdropdownitem.classList.remove("eye_hidden")
                eyenavdropdownitem.classList.add("eye_visible")
                sessionStorage.setItem("scorevis" + index, "visible")
            }
            else{
                score1.style.visibility = sessionStorage.getItem("scorevis" + index)
                score2.style.visibility = sessionStorage.getItem("scorevis" + index)
                eyenavdropdownitem.classList.remove("eye_hidden")
                eyenavdropdownitem.classList.add("eye_visible")
                setInitload(false)
            }
        }
        
    }, [togglestate])

    return(
        <>
        {index == 0 ? <li className="eyenavdropdownitem eyeall" onClick={all_toggle_visibility}>ALL</li>: null}
        <li id={"eyenavdropdownitem" + index} className="eyenavdropdownitem eye_visible" onClick={() => {toggle_visibility(index)}}>
            {matchups[index][0]} vs {matchups[index][1]}
        </li>
        </>
    )
}



export default EyeNavItem



