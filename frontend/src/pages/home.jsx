import Navbar from "../components/navbar/navbar.jsx"
import Header from "../components/home/header.jsx"
import Match from "../components/home/match.jsx"
import Nogameswrn from "../components/home/nogames_wrn.jsx"
import { createContext, useContext, useEffect, useState } from "react"
import NotFound from "./notfound.jsx"
import Loading from "./loading.jsx"
import useHomeData from "../hooks/useHomeData.jsx"
import useEyeStates from "../hooks/useEyeStates.jsx"
export const EyeStatesContext = createContext()
function Home(){
    
    const homedata = useHomeData()
    
    const [eyestates, toggle_visibility, all_toggle_visibility] = useEyeStates(homedata.game_count)
    
    
    

    
    const matches = []
    for (let i = 0; i < homedata.game_count; i++){
        matches.push(<Match key={i} homedata={homedata} index={i}/>)
    }
    
    if (homedata){ 
        // homedata is required as a condition due to a premature rendering everytime on first load, since homedata state default is false, we do not want that!
        return(
            <>
            <EyeStatesContext.Provider value={[eyestates, toggle_visibility, all_toggle_visibility]}>
            <Navbar homedata={homedata} useEyeStates={useEyeStates}/>
            {(!homedata.game_count) ? <Nogameswrn/> : null} 
            {homedata.game_count ? <Header/> : null }
            {matches}
            </EyeStatesContext.Provider>
            </>

        )
    }

    else{
        return(
            
            <Loading/>
        )
    }
}


export default Home