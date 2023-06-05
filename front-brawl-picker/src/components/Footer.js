import React from "react";
import {Link} from "react-router-dom"

function Footer () {
    return(
        <footer className="footerLg">
            <ul className="list_footerLg">
                <li>
                    <span className="">
                        <Link to={"/About"}>
                            <button className="w-16 text-gray-400 hover:text-body_bg">About</button>
                        </Link>
                        
                    </span>
                    <span>
                        <p className="text-sm">© 2022 - 2023 Brawl Picker (de777e6)</p>
                    </span>
                </li>
                <li><p className="text-xs">This content create with materials from Brawl Ninja. See more information there: https://brawltime.ninja/.</p>
                </li>
            </ul>
        </footer>
    )
 }

 export default Footer