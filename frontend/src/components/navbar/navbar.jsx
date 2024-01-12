import "./navbar.css"

function Navbar(props){
    const homedata = props.homedata
    const bballprops = itemprops_constructor("assets/navbar/bball.svg",)
    const chartprops = itemprops_constructor("assets/navbar/chart.svg")
    const bulbprops = itemprops_constructor("assets/navbar/bulb.svg")
    const eyeprops = itemprops_constructor("assets/navbar/eye.svg")
    eyeprops.href = "javascript:void(0)"
    eyeprops.dropdown = 1
    const githubprops = itemprops_constructor("assets/navbar/github.svg", "https://github.com/Vicescq/NBA-Web-Scraping", "_blank", "align_right")

    return (
    <nav className="navbar">
    <ul className="navlist">
        <NavItem itemprops={bballprops}/>
        <NavItem itemprops={chartprops}/>
        <NavItem itemprops={bulbprops}/>
        {homedata.game_count ? <NavItem itemprops={eyeprops}/> : null}
        <NavItem itemprops={githubprops}/>
    </ul>
    </nav>
    )
}

function itemprops_constructor(imgsrc, href="", target="", alignment="align_left", dropdown=0){
    return {imgsrc: imgsrc, href: href, target: target, alignment: alignment, dropdown: dropdown}
}

function NavItem(props){
    const itemprops = props.itemprops
    return(
        
        <li className={`navitem ${itemprops.alignment}`}>
        <a href={itemprops.href} target={itemprops.target} >
        <img src={itemprops.imgsrc}></img>
        </a>
        {itemprops.dropdown ? <NavDropDown/> : null}
        </li>
    )
}

function NavDropDown(props){
    return(
    <ul className="navdropdown">
        <NavDropDownItem/>
        <NavDropDownItem/>
        <NavDropDownItem/>
    </ul>

    )
}

function NavDropDownItem(props){
    return(
    <li className="navdropdownitem">
        ABC vs DEF
    </li>
    )
}

export default Navbar
