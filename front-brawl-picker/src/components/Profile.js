/* eslint-disable react/jsx-pascal-case */
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Brawler_slider from "./Brawler_slider/Brawler_slider"; 
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import "swiper/css/thumbs"
import {Swiper, SwiperSlide} from "swiper/react"
import SwiperCore from "swiper"
import { Pagination, Navigation } from "swiper"
//import "swiper/swiper-bundle"
//import Progress_bar from "./Brawler_slider/Progress_bar";
//import Card_icon from "https://cdn.brawlify.com/brawler/Bibi.png"
const API_URL = 'http://127.0.0.1:8000/api/'
SwiperCore.use([Navigation, Pagination])
function Profile () {

    const {brawlId} = useParams()
    //const [data, setData] = React.useState([])
    const [data, setData] = React.useState(JSON.parse(localStorage.getItem("data_tag")) || [])
    const [brawlers, setBrawlers] = React.useState([])
    const [battle_logs, setBattle_logs] = React.useState([])

    const [responseBattle_logs, setResponseBattle_logs] = React.useState([])
    
    const [clubInfo, setClubInfo] = React.useState([])
    const [clubMembers, setClubMembers] = React.useState([])
    
    useEffect(()=>{
        (async ()=>{
            await axios({
                method: 'post',
                url: API_URL,
                data: {
                    ent_tag:`#${brawlId}`
                },
            })
                .then(res => setData(res.data))
                .catch(err => console.error(err))
        })()
        console.log(brawlId)
    },[brawlId])

    useEffect(() => {
        localStorage.setItem("data_tag", JSON.stringify(data))
        //localStorage.clear()
        console.log(JSON.parse(localStorage.getItem("data_tag")))
    }, [data])

    useEffect(()=>{
        const clubParse = Boolean(data.length) && data[0].club_info.replace(/None/g, '"None"').replace(/Box\(/g, '').replace(/\)/g, '').replaceAll("\'", '"').replace(/([а-яёa-z0-9])"(?=[а-яёa-z0-9])/ig, "$1'").replace(/(🍷)"(♡)/gi, "$1'♡").replace(/(\s)"(\/)/g, "$1'/")
        const resClubParse = JSON.parse(clubParse)

        //Замена на прямой вызов к API
        //Boolean(data.length) && console.log(data[0].response_battle_logs)
        const responseBattle = Boolean(data.length) && JSON.parse(data[0].response_battle_logs)
        //Boolean(data.length) && console.log("responseBattle", responseBattle.items)

        //const clubMembersParse = Boolean(data.length) && JSON.parse(data[0].club_members[0])
        // Boolean(data.length) ? setBrawlers(eval('{[' + data[0].brawlers + ']}')) : <></>
        // Boolean(data.length) ? setBattle_logs(parsedData) : <></>
        // Boolean(data.length) ? setClubInfo(data[0].club_info) : <></>
        Boolean(data.length) ? setBrawlers(eval('{[' + data[0].brawlers + ']}')) : <></>
        
        //Boolean(data.length) ? setBattle_logs(res) : <></>
        Boolean(data.length) ? setBattle_logs(responseBattle.items) : <></>

        Boolean(data.length) ? setClubInfo(data[0].club_info) : <></>
        Boolean(data.length) ? setClubInfo(resClubParse) : <></>
        Boolean(data.length) ? setClubMembers(eval('{[' + data[0].club_members + ']}')) : <></>
        //Boolean(battle_logs.length) ? setBattle_logs_team(res.battle.teams):<></>
        //console.log("team", battle_logs_team)
        console.log("brawlers_obj", brawlers)
        console.log("battle_log", battle_logs)
        console.log("clubInfo", clubInfo)
        console.log("clubMembers", clubMembers)
        //console.log(l, res)
        
    }, [data])

    // useEffect (() =>{
    //     battle_logs && localStorage.setItem("data_tag", [])
    // }, [])
    
    
    // useEffect(()=>{
    //     (async ()=>{
    //         await axios({
    //             method: 'post',
    //             url: API_URL,
    //             data: {
    //                 ent_tag:`#${brawlId}`
    //             },
    //         })
    //             .then(res => setNew_tag(res.data))
    //             .catch(err => console.error(err))
    //     })()
    // },[brawlId])

    // useEffect(() => {
    //     setData([new_tag, ...data])
    //     localStorage.setItem("data_tag", JSON.stringify(data))
    //     //localStorage.clear()
    // }, [new_tag])
    //data[0][0].name

    
    const slides = [];
    Boolean(data.length) && battle_logs.map((item, index)=>
        slides.push(
            <SwiperSlide key={index}>
                <div className="Battle_logs_Card" >
                        <div className="Battle_logs_header" >
                            <span className="span_Battle_logs_header">
                                <span className="span_Battle_logs_header_result" >{item.battle.result} {item.battle.rank ? <span>Rank {item.battle.rank}</span>:<></>}</span>
                                <span className="span_Battle_logs_header_trophy" >{item.battle.trophyChange ? (item.battle.result === "victory" || Math.sign(item.battle.trophyChange)==1 ? <p>+</p> : Math.sign(item.battle.trophyChange) !== -1 ? <p>-</p> : <></>) : <></>}
                                {item.battle.trophyChange}</span>
                                {item.battle.trophyChange ? <img src="https://cdn.brawlify.com/icon/trophy.png" className="w-4 h-4" alt="new"/> : <></>}
                            </span>

                            <span className="span_Battle_logs_header">
                                {
                                    Date.now()-Date.parse(`${item.battleTime.slice(0, 4)+"-"+item.battleTime.slice(4, 6)+"-"+item.battleTime.slice(6, 11)+":"+item.battleTime.slice(11, 13)+":"+item.battleTime.slice(13)}`) < 1000*60 ?
                                        "now" :
                                        Date.now()-Date.parse(`${item.battleTime.slice(0, 4)+"-"+item.battleTime.slice(4, 6)+"-"+item.battleTime.slice(6, 11)+":"+item.battleTime.slice(11, 13)+":"+item.battleTime.slice(13)}`) < 1000*60*60 ?
                                            Math.floor((Date.now()-Date.parse(`${item.battleTime.slice(0, 4)+"-"+item.battleTime.slice(4, 6)+"-"+item.battleTime.slice(6, 11)+":"+item.battleTime.slice(11, 13)+":"+item.battleTime.slice(13)}`))/(1000*60))+" minutes ago" :
                                            Date.now()-Date.parse(`${item.battleTime.slice(0, 4)+"-"+item.battleTime.slice(4, 6)+"-"+item.battleTime.slice(6, 11)+":"+item.battleTime.slice(11, 13)+":"+item.battleTime.slice(13)}`) < 1000*60*60*24 ?
                                                "about "+Math.floor((Date.now()-Date.parse(`${item.battleTime.slice(0, 4)+"-"+item.battleTime.slice(4, 6)+"-"+item.battleTime.slice(6, 11)+":"+item.battleTime.slice(11, 13)+":"+item.battleTime.slice(13)}`))/(1000*60*60))+" hours ago" :
                                                Date.now()-Date.parse(`${item.battleTime.slice(0, 4)+"-"+item.battleTime.slice(4, 6)+"-"+item.battleTime.slice(6, 11)+":"+item.battleTime.slice(11, 13)+":"+item.battleTime.slice(13)}`) < 1000*60*60*24*30 ? 
                                                    "about "+Math.floor((Date.now()-Date.parse(`${item.battleTime.slice(0, 4)+"-"+item.battleTime.slice(4, 6)+"-"+item.battleTime.slice(6, 11)+":"+item.battleTime.slice(11, 13)+":"+item.battleTime.slice(13)}`))/(1000*60*60*24))+" days ago" : 
                                                    "about "+Math.floor((Date.now()-Date.parse(`${item.battleTime.slice(0, 4)+"-"+item.battleTime.slice(4, 6)+"-"+item.battleTime.slice(6, 11)+":"+item.battleTime.slice(11, 13)+":"+item.battleTime.slice(13)}`))/(1000*60*60*24*30))+" months ago"              
                                }
                            </span>
                        </div>
                        <div className="Battle_logs_body_name" style={{background: `${item.battle.mode.startsWith("br") ? "#5475DF" :
                                                                        item.battle.mode[0] === "g" ? "#7425BF" :
                                                                        item.battle.mode.startsWith("hot") ? "#890E1C" :
                                                                        item.battle.mode.startsWith("bos") ? "#900020" :
                                                                        item.battle.mode.startsWith("hei") ? "#94379B" :
                                                                        item.battle.mode.startsWith("boun") ? "#178185" :
                                                                        item.battle.mode.startsWith("bask") ? "#BF4D0A" :
                                                                        item.battle.mode.startsWith("duel") ? "#468CD5" :
                                                                        item.battle.mode[0] === "s" ? "#5C9B15" :
                                                                        item.battle.mode[0] === "d" ? "#5C9B15" :
                                                                        item.battle.mode[0] === "k" ? "#9B3401" :
                                                                        "#5475DF"}`}}>

                            <img src={`https://media.brawltime.ninja/modes/${item.battle.mode.startsWith("br") ? item.battle.mode.split("B").join("-b").toLowerCase() :
                                                                                item.battle.mode.startsWith("bos") ? item.battle.mode.split("F").join("-f").toLowerCase() :
                                                                                item.battle.mode.startsWith("baske") ? item.battle.mode.split("B").join("-b").toLowerCase() :
                                                                                item.battle.mode[0] === "g" ? item.battle.mode.split("G").join("-g").toLowerCase() :
                                                                                item.battle.mode[0] === "h" ? item.battle.mode.split("Z").join("-z").toLowerCase() :
                                                                                item.battle.mode[0] === "s" ? item.battle.mode.split("S").join("-s").toLowerCase() :
                                                                                item.battle.mode[0] === "d" ? item.battle.mode.split("S").join("-s").toLowerCase() :
                                                                                item.battle.mode.toLowerCase()}/icon.webp`} 
                                                                                className="Battle_logs_body_name_img" alt="icon"
                            />

                            <div className="Battle_logs_name_block">
                                <h2 className="Battle_logs_name_mode">{item.battle.mode}</h2>
                                <h3 className="Battle_logs_name_map">{item.event.map !== "null" ? item.event.map : <></>}</h3>
                            </div>
                        </div>

                        <div className="Brawler_logs_stats" style={{backgroundImage: "url("+`https://media.brawltime.ninja/modes/${item.battle.mode.startsWith("br") ? item.battle.mode.split("B").join("-b").toLowerCase() :
                                                                        item.battle.mode.startsWith("bos") ? item.battle.mode.split("F").join("-f").toLowerCase() :
                                                                        item.battle.mode.startsWith("baske") ? item.battle.mode.split("B").join("-b").toLowerCase() :
                                                                        item.battle.mode[0] === "g" ? item.battle.mode.split("G").join("-g").toLowerCase() :
                                                                        item.battle.mode[0] === "h" ? item.battle.mode.split("Z").join("-z").toLowerCase() :
                                                                        item.battle.mode[0] === "s" ? item.battle.mode.split("S").join("-s").toLowerCase() :
                                                                        item.battle.mode[0] === "d" ? item.battle.mode.split("S").join("-s").toLowerCase() :
                                                                        item.battle.mode.toLowerCase()}/background.webp`+")", backdropFilter: `brightness(50%)`}}>
                            

                            {item.battle.mode !== ("soloShowdown" || "duoShowdown" || "bossFight") && 
                            <ul className="ul_Brawler_logs_players">
                                {item.battle.teams[0].map((item_logs) => 
                                <Link to={`/Profile/${item_logs.tag.slice(1)}`} >
                                {/* <div className="Card_rank" onClick={handleChange}> */}
                                    <li className="li_Brawler_logs_players">
                                        <div className="Brawler_logs_players"><span><img src="https://cdn.brawlify.com/icon/trophy.png" className="w-4 h-4" alt="new"/></span> {item_logs.brawler.trophies}</div>
                                        <img src={`https://media.brawltime.ninja/brawlers/${item_logs.brawler.name.toLowerCase().includes(" ") ? item_logs.brawler.name.toLowerCase().includes(".") ? item_logs.brawler.name.toLowerCase().slice(0, item_logs.brawler.name.toLowerCase().indexOf("."))+"__"+item_logs.brawler.name.toLowerCase().slice(item_logs.brawler.name.toLowerCase().indexOf(" ")+1)  : item_logs.brawler.name.toLowerCase().slice(0, item_logs.brawler.name.toLowerCase().indexOf(" "))+"_"+item_logs.brawler.name.toLowerCase().slice(item_logs.brawler.name.toLowerCase().indexOf(" ")+1)  : item_logs.brawler.name.toLowerCase()}/avatar.webp`} className="Brawler_logs_player_img" alt="icon"/>
                                        <div className="Brawler_logs_players_name">
                                            {item_logs.name} 
                                        </div>
                                    </li>
                                    
                                </Link>
                                )}
                                {item.battle.teams[1].map((item_logs) =>
                                <Link to={`/Profile/${item_logs.tag.slice(1)}`} > 
                                    <li className="li_Brawler_logs_players">
                                        <div className="Brawler_logs_players"><span><img src="https://cdn.brawlify.com/icon/trophy.png" className="w-4 h-4" alt="new"/></span> {item_logs.brawler.trophies}</div>
                                        <img src={`https://media.brawltime.ninja/brawlers/${item_logs.brawler.name.toLowerCase().includes(" ") ? item_logs.brawler.name.toLowerCase().includes(".") ? item_logs.brawler.name.toLowerCase().slice(0, item_logs.brawler.name.toLowerCase().indexOf("."))+"__"+item_logs.brawler.name.toLowerCase().slice(item_logs.brawler.name.toLowerCase().indexOf(" ")+1)  : item_logs.brawler.name.toLowerCase().slice(0, item_logs.brawler.name.toLowerCase().indexOf(" "))+"_"+item_logs.brawler.name.toLowerCase().slice(item_logs.brawler.name.toLowerCase().indexOf(" ")+1)  : item_logs.brawler.name.toLowerCase()}/avatar.webp`} className="Brawler_logs_player_img" alt="icon"/>
                                        <div className="Brawler_logs_players_name">
                                            {item_logs.name} 
                                        </div>
                                    </li>
                                    
                                </Link>
                                )}
                            </ul>}
                            {item.battle.mode === ("soloShowdown" || "duoShowdown") && 
                            <ul className="ul_Brawler_logs_players_shd">
                                {item.battle.players.map((item_logs, index) => 
                                <Link to={`/Profile/${item_logs.tag.slice(1)}`} >
                                    <li className="li_Brawler_logs_players_shd">
                                        <div className="Brawler_logs_players_shd"><span><img src="https://cdn.brawlify.com/icon/trophy.png" className="w-4 h-4" alt="new"/></span> {item_logs.brawler.trophies}</div>
                                        <img src={`https://media.brawltime.ninja/brawlers/${item_logs.brawler.name.toLowerCase().includes(" ") ? item_logs.brawler.name.toLowerCase().includes(".") ? item_logs.brawler.name.toLowerCase().slice(0, item_logs.brawler.name.toLowerCase().indexOf("."))+"__"+item_logs.brawler.name.toLowerCase().slice(item_logs.brawler.name.toLowerCase().indexOf(" ")+1)  : item_logs.brawler.name.toLowerCase().slice(0, item_logs.brawler.name.toLowerCase().indexOf(" "))+"_"+item_logs.brawler.name.toLowerCase().slice(item_logs.brawler.name.toLowerCase().indexOf(" ")+1)  : item_logs.brawler.name.toLowerCase()}/avatar.webp`} className="Brawler_logs_player_img" alt="icon"/>
                                        <div className="Brawler_logs_players_name_shd">
                                            {item_logs.name} 
                                        </div>
                                    </li>
                                    
                                </Link>
                                )}
                            </ul>}
                            
                            
                        </div>
                    </div>
            </SwiperSlide>
        ))

    // const slideMode = [] <img src={`https://media.brawltime.ninja/brawlers/${item.brawler.name.toLowerCase().includes(" ") ? item.brawler.name.toLowerCase().includes(".") ? item.brawler.name.toLowerCase().slice(0, item.brawler.name.toLowerCase().indexOf("."))+"__"+item.brawler.name.toLowerCase().slice(item.brawler.name.toLowerCase().indexOf(" ")+1)  : item.brawler.name.toLowerCase().slice(0, item.brawler.name.toLowerCase().indexOf(" "))+"_"+item.brawler.name.toLowerCase().slice(item.brawler.name.toLowerCase().indexOf(" ")+1)  : item.brawler.name.toLowerCase()}/avatar.webp`} className="Brawler_logs_player_img" alt="icon"/>
                                        
    // Boolean(data.length) && 


    return(
        <div className="Profile">
            <h1 className="text-2xl font-medium my-4 text-center mb-8">Hello, Brawler {Boolean(data.length) && data[0].name}!</h1>
            <div className="my-2"></div>
            <div className="Profile_block">
                {Boolean(data.length) && 
                    <div className="Profile_card">
                        <h2 className="Profile_card_name"> {data[0].name} </h2>
                        <img src={`https://media.brawltime.ninja/avatars/${data[0].player_icon_id.slice(7, data[0].player_icon_id.length-1)}.webp`} className="Profile_card_img" alt="icon"/> 
                        <div className="Profile_card_stats">
                            <ul className="ul_Profile_card_stats">
                                <li><span>Name</span> <span  className="flex items-center gap-1.5"><div style={{background: `#${data[0].name_color.slice(2)}`}} className="w-4 h-4 border-black border-2"></div>{data[0].name}</span></li>
                                <li><span>Tag</span> <span>{data[0].tag}</span></li>
                                {(data[0].club_name !== "0") && 
                                    <li><span>Club</span>
                                        <Link to={`/Club/${data[0].club_tag.slice(1)}`} state={{clubInfo, clubMembers}}>
                                            <span className="flex items-center gap-1"><span><img  src={"https://brawltime.ninja/assets/club.dfc3d943.png"} className="w-4 h-4"/></span><span className="underline decoration-2">{data[0].club_name}</span></span>
                                        </Link> 
                                    </li>
                                }
                                <li><span>Profile level</span> <span className="span_Profile_card_stats"> <img src="https://cdn.brawlify.com/icon/Info.png" className="w-4 h-4" alt="new"/> {data[0].exp_level}</span></li>
                                <li><span>Highest Trophies</span> <span className="span_Profile_card_stats"> <img src="https://cdn.brawlify.com/icon/Ranking.png" className="w-4 h-4" alt="new"/> {data[0].highest_trophies}</span></li>
                                <li><span>Trophies</span> <span className="span_Profile_card_stats"> <img src="https://cdn.brawlify.com/icon/trophy.png" className="w-4 h-4" alt="new"/> {data[0].trophies}</span></li>
                                <li><span>Team (3v3) Wins</span > <span className="span_Profile_card_stats"> <img src="https://cdn.brawlify.com/icon/3v3.png" className="w-4 h-4" alt="new"/> {data[0].team_wins}</span></li>
                                <li><span>Solo Wins</span> <span className="span_Profile_card_stats"> <img src="https://cdn.brawlify.com/gamemode/Showdown.png" className="w-4 h-4" alt="new"/> {data[0].solo_wins}</span></li>
                                <li><span>Duo Wins</span> <span className="span_Profile_card_stats"> <img src="https://cdn.brawlify.com/gamemode/Duo-Showdown.png" className="w-4 h-4" alt="new"/> {data[0].duo_wins}</span></li>
                            </ul>
                        </div>
                    </div>}
                <div className="Brawlers">
                    <div className="info_brawlers">
                        <h1 className="text-xl font-medium my-2 mb-4">Brawlers</h1>
                        <h1 className="text-lg font-normal my-2 mb-4">Important info about your all Brawlers!</h1> 
                    </div>
                    <Brawler_slider brawlers={brawlers} />
                    <div className="my-6"></div>

                    <div className="info_brawlers">
                        <h1 className="text-xl font-medium my-2 mb-4">Battle Log</h1>
                        <h1 className="text-lg font-normal my-2 mb-4">See your latest battles and calculate your Win Rate!</h1> 
                    </div>
                    <div className="brawl_swiper_main_div">
                        <Swiper className="brawl_swiper_main" 
                            tag="section" 
                            wrapperTag="ul" 
                            slidesPerView={2}
                            spaceBetween={10}
                            slidesPerGroup={1}
                            grabCursor={true}
                            navigation={true}
                            breakpoints={{
                                280:{
                                    slidesPerView:1,
                                },
                                480:{
                                    slidesPerView: 1,
                                    spaceBetween: 20
                                },
                                768:{
                                    slidesPerView: 1.3,
                                    spaceBetween: 20
                                },
                                1024:{
                                    slidesPerView: 1.3,
                                    spaceBetween: 20
                                },
                                1280:{
                                    slidesPerView: 1.5,
                                    spaceBetween: 10
                                },
                                1536:{
                                    slidesPerView: 2,
                                },
                            }
                                
                            }
                            pagination={{
                                clickable: true,
                                }}
                            modules={[Pagination, Navigation]}
                        >
                            {slides}
                        </Swiper>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
}

export default Profile