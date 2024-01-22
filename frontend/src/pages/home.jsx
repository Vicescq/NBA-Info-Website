import Navbar from "../components/navbar/navbar.jsx"
import Header from "../components/home/header.jsx"
import Match from "../components/home/match.jsx"
import Nogameswrn from "../components/home/nogames_wrn.jsx"
import { useEffect, useState } from "react"
import NotFound from "./notfound.jsx"
import Loading from "./loading.jsx"

function Home(){
    let ms = 3000
    const [initload, setInitload] = useState(true)
    const [homedata, setData] = useState(false)
    

    
    
    
    
    useEffect(() => {
        
        if (initload){
            fetch_homedata(setData)
            
            setInitload(false)
        }
        
        else{
            const interval = setInterval(() => {
                fetch_homedata(setData)
            }, ms)
            return () => clearInterval(interval)
        }
        
    }, [initload]);
    


    const init_scorestates = []
    for (let i = 0; i < homedata.game_count; i++){
        init_scorestates.push("visible")
    }
    const [scorestates, setScoreStates] = useState(init_scorestates)
    
    function get_score_state(new_state, index){
        const new_scorestates = [...scorestates]
        new_scorestates[index] = new_state
        setScoreStates(new_scorestates)
    }
    
    

    
    const matches = []
    for (let i = 0; i < homedata.game_count; i++){
        matches.push(<Match key={i} homedata={homedata} index={i} scorestate={scorestates[i]}/>)
    }





    
    if (homedata){ 
        // homedata is required as a condition due to a premature rendering everytime on first load, since homedata state default is false, we do not want that!
        return(
            <>
            <Navbar homedata={homedata} control_eyenavitem_state={get_score_state}/>
            {(!homedata.game_count) ? <Nogameswrn/> : null} 
            {homedata.game_count ? <Header/> : null }
            {matches}
            </>
        )
    }

    else{
        return(
            
            <Loading/>
        )
    }
}

async function fetch_homedata(setData){
    const response = await fetch("/homedata")
    const homedata =  await response.json()
    setData(homedata)
    console.log(homedata)
}


export default Home