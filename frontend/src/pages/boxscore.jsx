import Navbar from "../components/navbar/navbar"
import NotFound from "./notfound"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Table from "../components/boxscore/table"
import Loading from "./loading"
import useBoxScoreData from "../hooks/useBoxScoreData"
import useGameCount from "../hooks/useGameCount"

function Boxscore(){
    const {index} = useParams()
    const boxscoredata = useBoxScoreData(index)
    const gamecount = useGameCount()
    const out_of_bounds = !((index >= 0) && (index < gamecount))
    
    if (!boxscoredata){
        return(
            <Loading/>
        )
        
    }

    else if (out_of_bounds){
        return(
            <>
            
            <NotFound/>
            </>
        )
    }

    else if(boxscoredata.error == "GAME HAS NOT STARTED"){
        return(
            <>
            <Navbar/> 
            <div>
                GAME HAS NOT STARTED
            </div>
            
            </>
        )
    }

    else{
        return(
            <>
            <Navbar/> 
            <Table players={boxscoredata.awayplayers}/>
            <Table players={boxscoredata.homeplayers}/>
            </>
        )
    }
    

}

export default Boxscore