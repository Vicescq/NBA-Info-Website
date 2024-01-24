import useHomeData from "../hooks/useHomeData"
import Home from "./home"
import Loading from "./loading"

function HomeProvider(){
    const homedata = useHomeData()
    return homedata ? <Home homedata={homedata}/> : <Loading/>
}

export default HomeProvider