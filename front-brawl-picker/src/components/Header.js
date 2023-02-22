import React from "react";
import {Link, useResolvedPath, useMatch} from "react-router-dom"

 function Header () {
    return(
        <header className="header_brawl">
            {/* <img src={Troll_face} alt="logo" className="logo_troll"/> */}
            <Link to="/" className="header_title"> Brawl Picker</Link>
            <ul className="list_header">
                <CustomLink to="/LeaderBoard" className="LeaderBoard"> LeaderBoard </CustomLink>
                <CustomLink to="/BrawlTierList" className="BrawlerTierList"> BrawlTierList </CustomLink>
                <CustomLink to="/" className="Profile_link"> Profile </CustomLink>
                <CustomLink to="/About" className="About_phone">
                    <img src="https://cdn.icon-icons.com/icons2/1302/PNG/512/helpbutton_85772.png" className="w-6" alt="new"/>
                </CustomLink>
                {/* <li className="header_Map_Tier_List"> Map Tier List</li>
                <li className="header_Brawler_Tier_List"> Brawler Tier List</li>
                <li className="header_Profile"> Profile </li> */}
            </ul>
        </header>
    )
 }

 function CustomLink ({ to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    // /price/another -> without end; /price -> with end
    const isActive = useMatch ({ path: resolvedPath.pathname, end: true })
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
 }

 export default Header