import useHomeData from "../hooks/useHomeData"
import Home from "./home"
import Loading from "./loading"

function HomeProvider(){
    const homedata = useHomeData()

    if(homedata){
        if(homedata.error == "SUCCESS"){
            return <Home homedata={homedata}/>
        }
        else{
            return <div>API ERROR!</div>
        }
    }
    
    else{
        return <Loading/>
    }
} 

export default HomeProvider