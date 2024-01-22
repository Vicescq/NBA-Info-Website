import "./navbar.css"
import EyeNavItem from "./eye"
import { Link } from "react-router-dom"

function Navbar({homedata, useEyeStates}){
    const bballprops = navitemprops_constructor("bball", "assets/navbar/bball.svg",)
    const chartprops = navitemprops_constructor("chart","assets/navbar/chart.svg")
    const bulbprops = navitemprops_constructor("bulb", "assets/navbar/bulb.svg")
    const eyeprops = navitemprops_constructor("eye", "assets/navbar/eye.svg")
    const githubprops = navitemprops_constructor("github", "assets/navbar/github.svg", "https://github.com/Vicescq/NBA-Web-Scraping", "_blank", "align_right")
    
    bballprops.href = "/"
    chartprops.href = "/"
    bulbprops.href = "/"
    eyeprops.dropdown = 1
    
    return (
    <nav className="navbar">
    <ul className="navlist">
        <NavItem itemprops={bballprops}/>
        <NavItem itemprops={chartprops}/>
        <NavItem itemprops={bulbprops}/>
        {homedata ? <EyeNavItem itemprops={eyeprops} homedata={homedata} useEyeStates={useEyeStates}/> : null}
        <NavItem itemprops={githubprops}/>
    </ul>
    </nav>
    )
}

function navitemprops_constructor(name, imgsrc, href="", target="", alignment="align_left", dropdown=0){
    return {name: name, imgsrc: imgsrc, href: href, target: target, alignment: alignment, dropdown: dropdown}
}

function NavItem({itemprops}){
    return(
            <li className={`navitem ${itemprops.alignment}`}>
            <Link to={itemprops.href} target={itemprops.target}>
            <img src={itemprops.imgsrc}></img>
            </Link>
            </li>
    )
}



export default Navbar
