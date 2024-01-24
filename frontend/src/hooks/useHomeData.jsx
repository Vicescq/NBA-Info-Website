import { useEffect, useState } from "react";

export default function useHomeData(){
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
    }, [initload])
    
    
    return homedata
}


async function fetch_homedata(setData){
    const response = await fetch("/homedata")
    const homedata =  await response.json()
    setData(homedata)
    console.log(homedata)
}
