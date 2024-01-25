import { useEffect, useState } from "react";

export default function useGameCount(){
    const ms = 6000
    const [initload, setInitload] = useState(true)
    const [gamecount, setGameCount] = useState(false)
    
    useEffect(() => {

        if(initload){
            fetch_gamecount(setGameCount)
            setInitload(false)
        }

        else{
            const interval = setInterval(() => {
                fetch_gamecount(setGameCount)
            }, ms)
            return () => clearInterval(interval)
        }

    }, [initload]);

    return gamecount
}

async function fetch_gamecount(setGamecount){
    const response = await fetch("/gamecount")
    const gamecount = await response.json()
    setGamecount(gamecount)
}