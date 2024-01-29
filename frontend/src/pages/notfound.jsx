import Navbar from "../components/navbar/navbar"
import "./notfound.css"

function NotFound(){
    return(
        <> 
        <Navbar/> 
        <div id="notfound">
            <a ><img src="assets\misc\notfound.png"></img></a>
        </div>
        </>
        
    )
}

export default NotFound