import React from "react";

function Bralwer_Card ({
    item, key, ...props
}) {

    return(
        <div className="Brawler_card" >
            <h2 className="Brawler_card_name">{item.name}</h2>
            <img src="https://cdn.brawlify.com/brawler/Bibi.png" className="Brawler_card_img" alt="icon"/>
            <div className="Brawler_card_stats">
                <ul className="ul_Brawler_card_stats">
                    <li><span>Power Level</span> <span className="span_Profile_card_stats"> <img src="https://cdn.brawlify.com/icon/Ranking.png" className="w-4 h-4" alt="new"/> {item.power}</span></li>
                    <li><span>Rank</span> <span className="span_Profile_card_stats"> <img src="https://brawltime.ninja/_nuxt/img/powerpoint_optimized.d856133.png" className="w-4 h-4" alt="new"/>{item.rank}</span></li>
                    <li><span>Highest Trophies</span> <span className="span_Profile_card_stats"> <img src="https://cdn.brawlify.com/icon/trophy.png" className="w-4 h-4" alt="new"/> {item.highest_trophies}</span></li>
                    <li><span>Trophies</span> <span className="span_Profile_card_stats"> <img src="https://cdn.brawlify.com/icon/trophy.png" className="w-4 h-4" alt="new"/> {item.trophies}</span></li>
                </ul>
            </div>
        </div>
    )
}

export default Bralwer_Card
