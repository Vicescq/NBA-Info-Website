import Navbar from "../components/navbar/navbar"
import NotFound from "./notfound"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

function Boxscore(){
    let ms = 3000

    const {index} = useParams()
    // const [gamecount, setGamecount] = useState(0)
    // useEffect(() => {

    // })

    // const gamecount = fetch_gamecount()
    // if ( !( (index >= 0) && (index < gamecount) ) ){
    //     return(
    //         <>
    //         <Navbar/> 
    //         <NotFound/>
    //         </>
    //     )
    // }

    const [initload, setInitload] = useState(true)
    const [boxscoredata, setBoxscoredata] = useState(false)

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

async function fetch_gamecount(){
    const response = await fetch("/gamecount")
    const gamecount = await response.json()
    console.log(gamecount)
    return gamecount
}

export default Boxscore