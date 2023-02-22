import React from "react";
import {Link, useResolvedPath, useMatch} from "react-router-dom"

function FooterPhone () {
    return(
        <footer className="footer_phone_brawl">
            <ul className="list_footer_phone">
                <CustomLink to="/" className="footer_phone_Profile"> Profile </CustomLink>
                <CustomLink to="/LeaderBoard" className="footer_phone_LeaderBoard"> Leaders </CustomLink>
                <CustomLink to="/BrawlTierList" className="footer_phone_BrawlerTierList"> Brawlers </CustomLink>
            </ul>
        </footer>
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

export default FooterPhone