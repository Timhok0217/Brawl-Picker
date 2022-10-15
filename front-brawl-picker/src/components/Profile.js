/* eslint-disable react/jsx-pascal-case */
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
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
    const [battle_logs_team, setBattle_logs_team] = React.useState([])
    
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
        const l = Boolean(data.length) && data[0].battle_logs.replace(/None/g, '"None"').replace(/Box\(/g, '').replace(/\)/g, '').replaceAll("\'", '"').replace(/([а-яёa-z0-9])"(?=[а-яёa-z0-9])/ig, "$1'").replace(/(🍷)"(♡)/gi, "$1'♡").replace(/(\s)"(\/)/g, "$1'/")
        const res = JSON.parse(l)
        Boolean(data.length) ? setBrawlers(eval('{[' + data[0].brawlers + ']}')) : <></>
        Boolean(data.length) ? setBattle_logs(res) : <></>
        //Boolean(battle_logs.length) ? setBattle_logs_team(res.battle.teams):<></>
        //console.log("team", battle_logs_team)
        console.log("brawlers_obj", brawlers)
        console.log("battle_log", battle_logs)
        //console.log(l, res)
        //console.log(l[6223],l[6224],l[6225], l[6226], l[6227],l[6228],l[3886],l[3887], l[3888],l[3889],l[3890],l[3891], l[3881],l[3881],l[3881],l[2825], l[2826],l[2819],l[2820])
    }, [data])
    
    
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
                                <span className="span_Battle_logs_header_result" >{item.battle.result}</span>
                                <span className="span_Battle_logs_header_trophy" >{item.battle.trophy_change ? (item.battle.result === "victory" ? <p>+</p> : Math.sign(item.battle.trophy_change) !== -1 ? <p>-</p> : <></>) : <></>}
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
{/* Не работает должным образом */}
                            {item.battle.mode !== ("soloShowdown" || "duoShowdown") && 
                            <ul className="ul_Brawler_logs_players">
                                {item.battle.teams[0].map((item_logs) => 
                                    <li className="li_Brawler_logs_players">
                                        <div className="Brawler_logs_players"><span><img src="https://cdn.brawlify.com/icon/trophy.png" className="w-4 h-4" alt="new"/></span> {item_logs.brawler.trophies}</div>
                                        <img src="https://cdn.brawlify.com/brawler/Bibi.png" className="Brawler_logs_player_img" alt="icon"/>
                                        <div className="Brawler_logs_players_name">
                                            {/* {item_logs.name.length >= 7 || item_logs.name.substring(0, 8).match(/\P{Extended_Pictographic}/u).index > 0 ?
                                                item_logs.name.substring(0, 8).match(/[A-Z А-Я 0-9]/g) !== null && item_logs.name.substring(0, 8).match(/[A-Z А-Я 0-9]/g).length > 1 || item_logs.name.substring(0, 8).match(/\P{Extended_Pictographic}/u).index > 0 ?
                                                    item_logs.name.substring(0, 8).match(/[A-Z А-Я 0-9]/g) !== null && item_logs.name.substring(0, 8).match(/[A-Z А-Я 0-9]/g).length > 2 ||  item_logs.name.substring(0, 8).match(/\P{Extended_Pictographic}/u).index > 0 ?
                                                        item_logs.name.substring(0, 8).match(/\P{Extended_Pictographic}/u).index > 0 ? `${item_logs.name.substring(0, 4)}...` :
                                                        `${item_logs.name.substring(0, 5)}...` :
                                                        `${item_logs.name.substring(0, 6)}...`:
                                                    `${item_logs.name.substring(0, 7)}...` :
                                                    item_logs.name.substring(0, 8).match(/\P{Extended_Pictographic}/u).index > 0 && item_logs.name.length >=5 ? 
                                                    `${item_logs.name.substring(0, 4)}...` : `${item_logs.name.substring(0, 8)}` }  */}
                                            {item_logs.name} 
                                        </div>
                                    </li>
                                )}
                                {item.battle.teams[1].map((item_logs) => 
                                    <li className="li_Brawler_logs_players">
                                        <div className="Brawler_logs_players"><span><img src="https://cdn.brawlify.com/icon/trophy.png" className="w-4 h-4" alt="new"/></span> {item_logs.brawler.trophies}</div>
                                        <img src="https://cdn.brawlify.com/brawler/Bibi.png" className="Brawler_logs_player_img" alt="icon"/>
                                        <div className="Brawler_logs_players_name">
                                            {/* {item_logs.name.length >= 7 || item_logs.name.substring(0, 8).match(/\P{Extended_Pictographic}/u).index > 0 ?
                                                item_logs.name.substring(0, 8).match(/[A-Z А-Я 0-9]/g) !== null && item_logs.name.substring(0, 8).match(/[A-Z А-Я 0-9]/g).length > 1 || item_logs.name.substring(0, 8).match(/\P{Extended_Pictographic}/u).index > 0 ?
                                                    item_logs.name.substring(0, 8).match(/[A-Z А-Я 0-9]/g) !== null && item_logs.name.substring(0, 8).match(/[A-Z А-Я 0-9]/g).length > 2 ||  item_logs.name.substring(0, 8).match(/\P{Extended_Pictographic}/u).index > 0 ?
                                                        item_logs.name.substring(0, 8).match(/\P{Extended_Pictographic}/u).index > 0 ? `${item_logs.name.substring(0, 4)}...` :
                                                        `${item_logs.name.substring(0, 5)}...` :
                                                        `${item_logs.name.substring(0, 6)}...`:
                                                    `${item_logs.name.substring(0, 7)}...` :
                                                    item_logs.name.substring(0, 8).match(/\P{Extended_Pictographic}/u).index > 0 && item_logs.name.length >=5 ?
                                                    `${item_logs.name.substring(0, 4)}...` : `${item_logs.name.substring(0, 8)}` }  */}
                                            {item_logs.name}
                                        </div>
                                    </li>
                                )}
                            </ul>}
                        </div>
                    </div>
            </SwiperSlide>
        ))


    return(
        <div className="Profile">
            <h1 className="text-2xl font-medium my-4 text-center mb-8">Hello, Brawler {Boolean(data.length) && data[0].name}!</h1>
            <div className="Profile_block">
                {Boolean(data.length) && 
                    <div className="Profile_card">
                        <h2 className="Profile_card_name"> {data[0].name} </h2>
                        <img src="https://cdn.brawlify.com/brawler/Bibi.png" className="Profile_card_img" alt="icon"/>
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