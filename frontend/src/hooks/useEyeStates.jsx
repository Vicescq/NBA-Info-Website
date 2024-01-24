import { useEffect, useState } from "react";

export default function useEyeStates(gamecount){
    
    // to make session data and state data persist between page reloads
    let init_eyestates = []
    const eyestates_session = JSON.parse(sessionStorage.getItem("home-eyestates"))
    if (eyestates_session){ // tab already open, on page switch
        init_eyestates = eyestates_session
    }
    else{ // first time tab open
        for (let i = 0; i < gamecount; i++){
            init_eyestates.push(false)
        }
    }
    const [eyestates, setEyeStates] = useState(init_eyestates)

    // update session data
    useEffect(() => {
        sessionStorage.setItem("home-eyestates", JSON.stringify(eyestates))
    }, [eyestates])

    function toggle_visibility(index) {
        setEyeStates(() => {
          const new_eyestates = [...eyestates];
          new_eyestates[index] = !eyestates[index];
          
          return new_eyestates;
        });
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