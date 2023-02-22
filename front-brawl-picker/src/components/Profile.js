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
    const [clubInfo, setClubInfo] = React.useState([])
    
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
        //const parsedData = Boolean(data.length)&&JSON.parse(data[0].battle_logs.replace(/Box\(/g, '').replace(/\)/g, '').replace(/(?<!\w)'|'(?!\w)|(?<=[#\s])'/g, '"').replace(/None/g, '"None"'))
        //console.log("parse_data", parsedData)
        const l = Boolean(data.length) && data[0].battle_logs.replace(/None/g, '"None"').replace(/Box\(/g, '').replace(/\)/g, '').replaceAll("\'", '"').replace(/([а-яёa-z0-9])"(?=[а-яёa-z0-9])/ig, "$1'").replace(/(🍷)"(♡)/gi, "$1'♡").replace(/(\s)"(\/)/g, "$1'/")
        const res = JSON.parse(l)
        // Boolean(data.length) ? setBrawlers(eval('{[' + data[0].brawlers + ']}')) : <></>
        // Boolean(data.length) ? setBattle_logs(parsedData) : <></>
        // Boolean(data.length) ? setClubInfo(data[0].club_info) : <></>
        Boolean(data.length) ? setBrawlers(eval('{[' + data[0].brawlers + ']}')) : <></>
        Boolean(data.length) && typeof(res)==undefined ? setBattle_logs(res) :
        Boolean(data.length) ? setClubInfo(data[0].club_info) : <></>
        //Boolean(battle_logs.length) ? setBattle_logs_team(res.battle.teams):<></>
        //console.log("team", battle_logs_team)
        console.log("brawlers_obj", brawlers)
        console.log("battle_log", battle_logs)
        console.log("clubInfo", clubInfo)
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
                                <span className="span_Battle_logs_header_trophy" >{item.battle.trophy_change ? (item.battle.result === "victory" || Math.sign(item.battle.trophy_change)==1 ? <p>+</p> : Math.sign(item.battle.trophy_change) !== -1 ? <p>-</p> : <></>) : <></>}
                                {item.battle.trophy_change}</span>
                                {item.battle.trophy_change ? <img src="https://cdn.brawlify.com/icon/trophy.png" className="w-4 h-4" alt="new"/> : <></>}
                                {/* {item.battle_time} */}
                            </span>
                            <span className="span_Battle_logs_header">
                                {item.battle.type}
                            </span>
                        </div>
                        <div className="Battle_logs_body_name">
                            <img src="https://media.brawltime.ninja/modes/brawl-ball/icon.webp?size=160" className="Battle_logs_body_name_img" alt="icon"/>
                            <div className="Battle_logs_name_block">
                                <h2 className="Battle_logs_name_mode">{item.battle.mode}</h2>
                                <h3 className="Battle_logs_name_map">{item.event.map !== "None" ? item.event.map : <></>}</h3>
                            </div>
                        </div>
                        <div className="Brawler_logs_stats">
                            <div className="img_Brawler_logs_stats"></div>

                            {item.battle.mode !== ("soloShowdown" || "duoShowdown") && 
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
                            {item.battle.mode == ("soloShowdown" || "duoShowdown") && 
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
                                <li><span>Name</span> <span>{data[0].name}</span></li>
                                <li><span>Tag</span> <span>{data[0].tag}</span></li>
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