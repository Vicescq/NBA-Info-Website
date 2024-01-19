import Navbar from "../components/navbar/navbar"
import NotFound from "./notfound"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

function Boxscore(){
    
    
    const [initload, setInitload] = useState(true)
    const [boxscoredata, setBoxscoredata] = useState(false)
    let ms = 3000

    useEffect(() => {

        if (initload){
            fetch_boxscore(setBoxscoredata)
            setInitload(false)
        }

        else{
            const interval = setInterval(() => {
                fetch_boxscore(setBoxscoredata)
            }, ms)
            return () => clearInterval(interval)
        }

    }, [initload]);

    return(
        <>
        <Navbar/> 
        <div>
            {boxscoredata.test}
        </div>
        </>
    )
        
    
}

async function fetch_boxscore(setBoxscoredata){
    const response = await fetch("/boxscore")
    const boxscoredata = await response.json()
    setBoxscoredata(boxscoredata)
    console.log(boxscoredata)
}

export default Boxscore