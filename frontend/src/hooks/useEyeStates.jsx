import { useEffect, useState } from "react";

export default function useEyeStates(game_count){
    const init_eyestates = []
    for (let i = 0; i < game_count; i++){
        init_eyestates.push(true)
    }
    
    const [eyestates, setEyeStates] = useState(init_eyestates)
    
    
    // false == visible, true == hidden
    function toggle_visibility(index, eyestates){
        
        setEyeStates(() => {
            console.log(eyestates)
            const new_eyestates = [...eyestates]
            new_eyestates[index] = !eyestates[index]
            console.log(new_eyestates)
            return new_eyestates
        })
    }

    function all_toggle_visibility(){
        const equality = arr => arr.every(val => val === arr[0])
        const invert = arr => arr.map(val => !val)
        const toggle_remaining_visible = arr => arr.map(val => !val ? !val : val)

        setEyeStates(() => {
            
            const new_eyestates = [...eyestates]
            if (equality(new_eyestates)){
                return invert(new_eyestates)
            }
            else{
                return toggle_remaining_visible(new_eyestates)
            }
        }) 
    } 

    return [eyestates, toggle_visibility, all_toggle_visibility]

}