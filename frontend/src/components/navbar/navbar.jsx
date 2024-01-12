import "./navbar.css"
import Eye from "../home/eye.jsx"

function Navbar(props){

    const homedata = props.homedata
    

    return (
        <nav className="navbar">
        <ul className="navlist">
            <div className="ele_wrapper">
                <li className="ele"><a href=""><img src="assets/navbar/bball.svg"></img></a></li> 
                <li className="ele"><a href=""><img src="assets/navbar/chart.svg"></img></a></li> 
                
                <Eye homedata={homedata}/>
                
            </div>
            <div className="second_half ele_wrapper">
                <li className="ele"><a href=""><img src="assets/navbar/bulb.svg"></img></a></li>
                <li className="ele"><a href="https://github.com/Vicescq/NBA-Web-Scraping" target="_blank"><img src="assets/navbar/github.svg"></img></a></li>
            </div>
        </ul>
    </nav>
    )
}

export default Navbar