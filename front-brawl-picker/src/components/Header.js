import React from "react";
import {Link, useResolvedPath, useMatch} from "react-router-dom"

 function Header () {
    return(
        <header className="header_brawl">
            <Link to="/" className="header_title"> Brawl Picker</Link>
            <ul className="list_header">
                <CustomLink to="/LeaderBoard" className="LeaderBoard"> LeaderBoard </CustomLink>
                <CustomLink to="/" className="Profile_link"> Profile </CustomLink>
                <CustomLink to="/About" className="About_phone">
                    <div className="w-8 rounded-full border-2 flex justify-center opacity-70 items-center hover:opacity-100 hover:text-body_bg">i</div>
                </CustomLink>
            </ul>
        </header>
    )
 }

 function CustomLink ({ to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
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