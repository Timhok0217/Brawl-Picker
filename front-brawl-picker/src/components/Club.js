import React from "react";
import {Link, useLocation } from "react-router-dom";


function Club () {
    const {state} = useLocation()

    return(
        <div className="LeaderBoard-main">
            <h1 className="text-xl font-medium mt-4 mb-4 text-center">Brawl Stars Club Info</h1>
            <div className="LeaderBoard-wrapper"> 
                <ul className="LeaderBoard-list">
                    <li className= "flex items-center justify-between mb-5">
                        <span className="text-lg">{state.clubInfo[1]}</span> 
                        <span className="flex flex-col items-end">
                            <span className="flex gap-1 items-center">Trophies: <span>{Math.floor(state.clubInfo[4]/1000)}k</span> <span><img src="https://cdn.brawlify.com/icon/trophy.png" className="w-4 h-4" alt="new"/></span></span>
                            <span className="flex gap-1 items-center">Need: <span>{state.clubInfo[5]}</span><span><img src="https://cdn.brawlify.com/icon/trophy.png" className="w-4 h-4" alt="new"/></span></span>
                        </span>
                    </li>
                    <li className="italic mb-5">{state.clubInfo[2]}</li>
                    <li className="w-100%"><div className="h-1 w-100% border mb-5"></div></li>
                    {state.clubMembers[0].map((item, index) =>
                        <Link to={`/Profile/${item.tag.slice(1)}`} key={index}> 
                            <li className="flex justify-between items-center my-3" key={index}>
                                <div className="flex gap-3 items-center">
                                    <span className="w-5 text-end">{index+1}</span> 
                                    <div className="flex gap-2 items-center">
                                        <img src={`https://media.brawltime.ninja/avatars/${item.icon.id}.webp`} className="w-9 h-9"/> 
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                </div> 
                                <div className="flex items-center gap-1">
                                    <span>{item.trophies}</span>
                                    <span>
                                        <img src="https://cdn.brawlify.com/icon/trophy.png" className="w-4 h-4" alt="new"/>
                                    </span>
                                </div>
                            </li>
                        </Link>
                    )}
                </ul>
            </div>
        </div>
    )

}

export default Club