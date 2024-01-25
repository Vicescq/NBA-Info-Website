import Navbar from "../components/navbar/navbar.jsx"
import Header from "../components/home/header.jsx"
import Match from "../components/home/match.jsx"
import Nogameswrn from "../components/home/nogames_wrn.jsx"
import { createContext } from "react"
import useEyeStates from "../hooks/useEyeStates.jsx"

function Home({homedata}){

    const [eyestates, toggle_visibility, all_toggle_visibility] = useEyeStates(homedata.game_count, homedata.gameids)
    
    const matches = []
    for (let i = 0; i < homedata.game_count; i++){
        matches.push(<Match key={i} homedata={homedata} index={i}/>)
    }

    localStorage.setItem("home-games", JSON.stringify(homedata.gameids))

    return(
        <>
        <EyeStatesContext.Provider value={[eyestates, toggle_visibility, all_toggle_visibility]}>
        
        <Navbar homedata={homedata}/>
        {homedata.game_count ? <Header/> : <Nogameswrn/> }
        {matches}
        
        </EyeStatesContext.Provider>
        </>
    )
}


export default Home
export const EyeStatesContext = createContext()