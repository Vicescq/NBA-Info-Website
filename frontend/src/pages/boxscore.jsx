import Navbar from "../components/navbar/navbar"
import NotFound from "./notfound"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

function Boxscore(props){
    const homedata = props.homedata
    const {id} = useParams()
    const [boxscoredata, setBoxscoredata] = useState(false)
    let initload = true
    let ms = 3000

    useEffect(() => {
        if (initload){
            fetch_boxscore(setBoxscoredata)
            initload = false
        }

        else{
            const interval = setInterval(() => {
            fetch_boxscore(setBoxscoredata)
            }, ms)
            return () => clearInterval(interval)
        }

      }, []);

    if (homedata){
        if ((id < 0 || id >= homedata.game_count)){
            return(
                <>
                <Navbar/>
                <NotFound/>
                </>
            )
        }
    
        else{
            return(
                <>
                <Navbar/> 
                <div>
                    {boxscoredata.test}
                </div>
                </>
            )
        }
    }
}

async function fetch_boxscore(setBoxscoredata){
    const response = await fetch("/boxscore")
    const boxscoredata = await response.json()
    setBoxscoredata(boxscoredata)
    console.log(boxscoredata)
}

export default Boxscore