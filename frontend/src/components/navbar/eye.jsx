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
            items.push(<EyeNavDropDownItem matchups={homedata.matchups} index={i} game_count={homedata.game_count} key={i}/>)
        }
        
        return(
        <ul className="eyenavdropdown">
            {items}
        </ul>
        )
    }
}

function EyeNavDropDownItem(props){
    const [pressed, setPressed] = useState(false)
    const matchups = props.matchups
    const index = props.index
    const game_count = props.game_count
    const item_onclick = (if_all, pressed) => {
        if (if_all){
            const score_arr = []
            for (let i = 0; i < game_count; i++){
                const score1 = document.getElementById("match_" + i).children[0].children[0]
                const score2 = document.getElementById("match_" + i).children[2].children[1]
                score_arr.push([score1, score2])
            }

            let i = 0
            const visiblity_tracker = []
            while(i < game_count){
                if (score_arr[i][0].style.visibility == "hidden"){
                    visiblity_tracker.push(0)
                }
                else{
                    visiblity_tracker.push(1)
                }
                i += 1
            }

            const set = new Set(visiblity_tracker)
            if (set.size == 1){
                for (let i = 0; i < game_count; i++){

                    
                    if(visiblity_tracker[0] == 1){
                        score_arr[i][0].style.visibility = "hidden"
                        score_arr[i][1].style.visibility = "hidden"
                    }
                    else{
                        score_arr[i][0].style.visibility = "visible"
                        score_arr[i][1].style.visibility = "visible"
                    }
                }
            }
            else{
                for (let i = 0; i < game_count; i++){
                    if (visiblity_tracker[i]){
                        score_arr[i][0].style.visibility = "hidden"
                        score_arr[i][1].style.visibility = "hidden"
                    }
                }
            }
            
        }
        else{
            const score1 = document.getElementById("match_" + index).children[0].children[0]
            const score2 = document.getElementById("match_" + index).children[2].children[1]
            if (pressed == false){
                
                score1.style.visibility = "hidden"
                score2.style.visibility = "hidden"   
            }
            else{
                
                score1.style.visibility = "visible"
                score2.style.visibility = "visible"
            }
            setPressed(!pressed)
            
        }
    }

    
    


    return(
        <>
        {index == 0 ? <li className="eyenavdropdownitem eyeall" onClick={() => {item_onclick(1, pressed)}}>ALL</li>: null}
        <li className="eyenavdropdownitem" onClick={() => {item_onclick(0, pressed)}}>
            {matchups[index][0]} vs {matchups[index][1]}
        </li>
        </>
    )
}


export default EyeNavItem



