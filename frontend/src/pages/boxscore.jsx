import Navbar from "../components/navbar/navbar"
import NotFound from "./notfound"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Table from "../components/boxscore/table"
import Loading from "./loading"

function Boxscore(){
    let ms = 6000
    const {index} = useParams()
    const [initload, setInitload] = useState(true)
    const [gamecount, setGamecount] = useState(0)
    const [boxscoredata, setBoxscoredata] = useState(false)

    useEffect(() => {

        if(initload){
            fetch_boxscore(setBoxscoredata, index)
            fetch_gamecount(setGamecount)
            setInitload(false)
        }

        else{
            const interval = setInterval(() => {
                fetch_boxscore(setBoxscoredata, index)
                fetch_gamecount(setGamecount)
            }, ms)
            return () => clearInterval(interval)
        }

    }, [initload]);
    
    const out_of_bounds = !((index >= 0) && (index < gamecount))
    
    if (!boxscoredata){
        return(
            <Loading/>
        )
        
    }

    else if ( out_of_bounds){
        return(
            <>
            <Navbar/> 
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

async function fetch_boxscore(setBoxscoredata, index){
    const response = await fetch(`/boxscore?mindex=${index}`)
    const boxscoredata = await response.json()
    setBoxscoredata(boxscoredata)
    console.log(boxscoredata)
}

async function fetch_gamecount(setGamecount){
    const response = await fetch("/gamecount")
    const gamecount = await response.json()
    setGamecount(gamecount)
}

export default Boxscore