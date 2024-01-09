import Navbar from "../global/navbar.jsx"
import Header from "./header.jsx"
import Match from "./match.jsx"


function Home(props){
    const homedata = props.homedata
    if (homedata.null){
        return (
            <>
            
            <Header/>
            <div className="nogames">{homedata.null}</div>
            </>
        )
    }

    else if (homedata.API_err){
        return (
            <>
            
            <Header/>
            <div className="api_error">{homedata.API_err}</div>
            </>
        )
    }
    
    else{
        const matches = []
        for (let i = 0; i < homedata.game_count; i++){
            matches.push(<Match key={i} homedata={homedata} index={i}/>)
        }
        return (
            <>
            <Navbar/>
            <Header/>
            {matches}
            </>
        )
    }
}

export default Home