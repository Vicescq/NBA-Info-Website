import "./navbar.css"

function Navbar(){
    return (
        <nav className="navbar">
        <ul>
            <div>
                <li><a href=""><img src="assets/navbar/bball.svg"></img></a></li> 
                <li><a href=""><img src="assets/navbar/chart.svg"></img></a></li> 
            </div>
            <div className="second_half">
                <li className="right_end"><a href=""><img src="assets/navbar/bulb.svg"></img></a></li>
                <li className="right_end"><a href="https://github.com/Vicescq/NBA-Web-Scraping" target="_blank"><img src="assets/navbar/github.svg"></img></a></li>
            </div>
        </ul>
    </nav>
    )
}

export default Navbar