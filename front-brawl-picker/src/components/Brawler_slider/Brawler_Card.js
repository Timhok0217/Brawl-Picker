import React from "react";

function Bralwer_Card ({
    item, key, ...props
}) {

    return(
        <div className="Brawler_card" >
            <h2 className="Brawler_card_name">{item.name}</h2>
            <img src={`https://media.brawltime.ninja/brawlers/${item.name.toLowerCase().includes(" ") ? item.name.toLowerCase().includes(".") ? item.name.toLowerCase().slice(0, item.name.toLowerCase().indexOf("."))+"__"+item.name.toLowerCase().slice(item.name.toLowerCase().indexOf(" ")+1)  : item.name.toLowerCase().slice(0, item.name.toLowerCase().indexOf(" "))+"_"+item.name.toLowerCase().slice(item.name.toLowerCase().indexOf(" ")+1)  : item.name.toLowerCase()}/avatar.webp`} className="Brawler_card_img" alt="icon"/>
            <div className="flex justify-center gap-5 items-center">
                <ul className="flex gap-2">
                    {Boolean(item.gadgets[0]) && item.gadgets.map((item_gadget, index) => 
                        <li className="w-8 h-8"><img src={`https://media.brawltime.ninja/gadgets/${item_gadget.id}.webp`}/></li>
                    )}
                </ul>
                <ul className="flex gap-1 items-center">
                    {Boolean(item.star_powers[0]) && item.star_powers.map((item_power, index) => 
                        <li className="w-8 h-8"><img src={`https://media.brawltime.ninja/starpowers/${item_power.id}.webp`}/></li>
                    )}
                </ul>
            </div>
            <div className="flex justify-center">
                <ul className="flex gap-1">
                    {Boolean(item.gears[0]) && item.gears.map((item_gears, index) => 
                        <li className="w-8 h-8"><img src={`https://media.brawltime.ninja/gears/${item_gears.name.toLowerCase().split(" ").length >1 ? item_gears.name.toLowerCase().split(" ").join("_")+'_1' : item_gears.name.toLowerCase().split(" ").join("_")+'_'+item_gears.level}.webp`} /></li>
                    )}
                </ul>
            </div>
            <div className="Brawler_card_stats">
                <ul className="ul_Brawler_card_stats">
                    <li><span>Power Level</span> <span className="span_Profile_card_stats"> <img src="https://brawltime.ninja/assets/starpower_optimized.f5e2c19a.png" className="w-6 h-4" alt="new"/> {item.power}</span></li>
                    <li><span>Rank</span> <span className="span_Profile_card_stats"> <img src="https://cdn.brawlify.com/icon/Ranking.png" className="w-4 h-4" alt="new"/>{item.rank}</span></li>
                    <li><span>Highest Trophies</span> <span className="span_Profile_card_stats"> <img src="https://cdn.brawlify.com/icon/trophy.png" className="w-4 h-4" alt="new"/> {item.highest_trophies}</span></li>
                    <li><span>Trophies</span> <span className="span_Profile_card_stats"> <img src="https://cdn.brawlify.com/icon/trophy.png" className="w-4 h-4" alt="new"/> {item.trophies}</span></li>
                </ul>
            </div>
        </div>
    )
}

export default Bralwer_Card
