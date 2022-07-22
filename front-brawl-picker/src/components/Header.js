import React from "react";

 function Header () {
    return(
        <header className="header_brawl">
            {/* <img src={Troll_face} alt="logo" className="logo_troll"/> */}
            <h1 className="header_title"> Brawl Picker</h1>
            <ul className="list_header">
                <li className="header_Map_Tier_List"> Map Tier List</li>
                <li className="header_Brawler_Tier_List"> Brawler Tier List</li>
                <li className="header_Profile"> Profile </li>
            </ul>
        </header>
    )
 }

 export default Header