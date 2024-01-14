import "./navbar.css"
import EyeNavItem from "./eye"

function Navbar(props){
    const homedata = props.homedata
    const bballprops = navitemprops_constructor("bball", "assets/navbar/bball.svg",)
    const chartprops = navitemprops_constructor("chart","assets/navbar/chart.svg")
    const bulbprops = navitemprops_constructor("bulb", "assets/navbar/bulb.svg")
    const eyeprops = navitemprops_constructor("eye", "assets/navbar/eye.svg")
    eyeprops.dropdown = 1
    const githubprops = navitemprops_constructor("github", "assets/navbar/github.svg", "https://github.com/Vicescq/NBA-Web-Scraping", "_blank", "align_right")
    
    return (
    <nav className="navbar">
    <ul className="navlist">
        <NavItem itemprops={bballprops}/>
        <NavItem itemprops={chartprops}/>
        <NavItem itemprops={bulbprops}/>
        {homedata.game_count ? <EyeNavItem itemprops={eyeprops} homedata={homedata}/> : null}
        <NavItem itemprops={githubprops}/>
    </ul>
    </nav>
    )
}

function navitemprops_constructor(name, imgsrc, href="", target="", alignment="align_left", dropdown=0){
    return {name: name, imgsrc: imgsrc, href: href, target: target, alignment: alignment, dropdown: dropdown}
}

function NavItem(props){
    const itemprops = props.itemprops
    return(
            <li className={`navitem ${itemprops.alignment}`}>
            <a href={itemprops.href} target={itemprops.target} >
            <img src={itemprops.imgsrc}></img>
            </a>
            </li>
    )
}



export default Navbar
