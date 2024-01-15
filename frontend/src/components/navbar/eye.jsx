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
    const matchups = props.matchups
    const index = props.index
    const game_count = props.game_count
    const item_onclick = (if_all) => {
        if (if_all){
            const score_arr = gather_score_DOMS(game_count)
            const visibility_tracker = probe_score_visiblity_states(game_count, score_arr)
            toggling_logic_scores(game_count, score_arr, visibility_tracker)
        }
        else{
            const eyenavitem = document.getElementById("eyenavdropdownitem_" + index)
            const score1 = document.getElementById("match_" + index).children[0].children[0]
            const score2 = document.getElementById("match_" + index).children[2].children[1]
            console.log(score1.style.visibility)
            if (score1.style.visibility == "visible" || score1.style.visibility == ""){   // "" bc it starts as "" on first load
                score1.style.visibility = "hidden"
                score2.style.visibility = "hidden"
                eyenavitem.style.textDecoration = "line-through"
                eyenavitem.style.backgroundColor = "#b3152a"

            }
            else{
                score1.style.visibility = "visible"
                score2.style.visibility = "visible"
                eyenavitem.style.textDecoration = ""
                eyenavitem.style.backgroundColor = "#242222"
            }
        }
    }

    return(
        <>
        {index == 0 ? <li className="eyenavdropdownitem eyeall" onClick={() => {item_onclick(1)}}>ALL</li>: null}
        <li id={"eyenavdropdownitem_" + index} className="eyenavdropdownitem" onClick={() => {item_onclick(0)}}>
            {matchups[index][0]} vs {matchups[index][1]}
        </li>
        </>
    )
}

function gather_score_DOMS(game_count){
    const score_arr = []
    for (let i = 0; i < game_count; i++){
        const score1 = document.getElementById("match_" + i).children[0].children[0]
        const score2 = document.getElementById("match_" + i).children[2].children[1]
        score_arr.push([score1, score2])
    }
    return score_arr   
}

function probe_score_visiblity_states(game_count, score_arr){
    let i = 0
    const visibility_tracker = []
    while(i < game_count){
        if (score_arr[i][0].style.visibility == "hidden"){
            visibility_tracker.push(0)
        }
        else{
            visibility_tracker.push(1)
        }
        i += 1
    }
    return visibility_tracker
}

function toggling_logic_scores(game_count, score_arr, visibility_tracker){
    const set = new Set(visibility_tracker)
    if (set.size == 1){
        if(visibility_tracker[0] == 1){
            for (let i = 0; i < game_count; i++){
                const eyenavitem = document.getElementById("eyenavdropdownitem_" + i)
                score_arr[i][0].style.visibility = "hidden"
                score_arr[i][1].style.visibility = "hidden"
                eyenavitem.style.textDecoration = "line-through"
                eyenavitem.style.backgroundColor = "#b3152a"
            }
        }
        else{
            for (let i = 0; i < game_count; i++){
                const eyenavitem = document.getElementById("eyenavdropdownitem_" + i)
                score_arr[i][0].style.visibility = "visible"
                score_arr[i][1].style.visibility = "visible"
                eyenavitem.style.textDecoration = ""
                eyenavitem.style.backgroundColor = "#242222"
            }
        }
    }
    else{
        for (let i = 0; i < game_count; i++){
            const eyenavitem = document.getElementById("eyenavdropdownitem_" + i)
            if (visibility_tracker[i]){
                score_arr[i][0].style.visibility = "hidden"
                score_arr[i][1].style.visibility = "hidden"
                eyenavitem.style.textDecoration = "line-through"
                eyenavitem.style.backgroundColor = "#b3152a"
            }
        }
    }
}

export default EyeNavItem



