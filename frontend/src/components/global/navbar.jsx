import "./navbar.css"
import bball from "../../assets/navbar/bball.svg"
import chart from "../../assets/navbar/chart.svg"
import bulb from "../../assets/navbar/bulb.svg"
import github from "../../assets/navbar/github.svg"

function Navbar(){
    return (
        <nav className="navbar">
        <ul>
            <div>
                <li><a href=""><img src={bball}></img></a></li> 
                <li><a href=""><img src={chart}></img></a></li> 
            </div>
            <div className="second_half">
                <li className="right_end"><a href=""><img src={bulb}></img></a></li>
                <li className="right_end"><a href="https://github.com/Vicescq/NBA-Web-Scraping" target="_blank"><img src={github}></img></a></li>
            </div>
        </ul>
    </nav>
    )
}

export default Navbar