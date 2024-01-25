import { useEffect, useState } from "react";


export default function useBoxScoreData(index){
    const [initload, setInitload] = useState(true)
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

    return boxscoredata

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