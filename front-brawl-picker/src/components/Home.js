import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/thumbs"

import logo from "../img/Logo.png"

import {Swiper, SwiperSlide} from "swiper/react"
import SwiperCore, { Thumbs } from "swiper"
import { Pagination, Navigation } from "swiper"

const APIHOME_URL = 'http://127.0.0.1:8000/apiHome/'

 function Home ({
     name,
     value, handleChange,
     ...props
}) {
    //Задержка пока что не работает
    // const [data_tag, setData_tag] = React.useState(JSON.parse(localStorage.getItem("data_tag")) || [])
    
    // let navigate = useNavigate();
    // function thatClick() {
    //     console.log(value, name, data_tag[0].tag, value)
    //     setTimeout(()=> {
    //         navigate(`/Profile/${value.slice(1)}`);
    //     }, 1400)
    //     //handleChange()          
    // }

    const [dataHome, setDataHome] = React.useState(JSON.parse(localStorage.getItem("dataHome")) || [])
    const [dataRankPlayers, setDataRankPlayers] = React.useState([])
    const [dataEvents, setDataEvents] = React.useState([])

    useEffect(()=>{
        (async ()=>{
            await axios({
                method: 'post',
                url: APIHOME_URL,
                data: {
                    dataHome: 0,
                },
            })
                .then(res => setDataHome(res.data))
                .catch(err => console.error(err))
        })()
        //console.log(dataHome)
    }, [])

    useEffect(() => {
        localStorage.setItem("dataHome", JSON.stringify(dataHome))
        //localStorage.clear()
        console.log(JSON.parse(localStorage.getItem("dataHome")))
    }, [dataHome])

    useEffect(()=>{
        //const l = Boolean(dataHome.length) && dataHome[0].rankPlayers.replace(/None/g, '"None"').replace(/Box\(/g, '').replace(/\)/g, '').replaceAll("\'", '"').replace(/([а-яёa-z0-9])"(?=[а-яёa-z0-9])/ig, "$1'").replace(/(🍷)"(♡)/gi, "$1'♡").replace(/(\s)"(\/)/g, "$1'/")
        //const res = JSON.parse(l)

        //Boolean(dataHome.length) && console.log(dataHome[0].rankPlayers)
        const responseRankPlayers = Boolean(dataHome.length) && JSON.parse(dataHome[0].rankPlayers)
        
        const eventsParse = Boolean(dataHome.length) && JSON.parse(dataHome[0].events)

        Boolean(dataHome.length) ? setDataRankPlayers(responseRankPlayers.items) : <></>
        //Boolean(dataHome.length) ? setDataRankPlayers(res) : <></>
        
        Boolean(dataHome.length) ? setDataEvents(eventsParse) : <></>

        console.log("logPlayers", dataRankPlayers)
        console.log("logEvents", dataEvents)
    }, [dataHome])


    const slidesRankPlayers = []
    Boolean(dataHome.length) && dataRankPlayers.map((item, index)=>
        (index<10)&&slidesRankPlayers.push(
            <SwiperSlide key={index}>
                <Link to={`/Profile/${item.tag.slice(1)}`} >
                <div className="Card_rank">
                <span className="text-white font-medium rounded-full bg-input_tag  w-6 h-6 text-center border flex justify-center items-center absolute right-1 top-1">{item.rank}</span>
                    <div className="Card_rank_header">
                        <div className="flex items-center"><img src={`https://media.brawltime.ninja/avatars/${item.icon.id}.webp`} className="w-12 h-12" /> <span className="ml-4 w-">{item.name}</span></div>  
                    </div>
                    
                    <div className="Card_rank_body">
                        <span>Trophies</span><div className="flex justify-center items-center "><span className="mx-2"><img src="https://cdn.brawlify.com/icon/trophy.png" className="w-4 h-4" alt="new"/></span> <span>{item.trophies}</span></div>
                    </div>        
                </div>
                </Link>
            </SwiperSlide>
        )
    )

    const slidesModes = []
    Boolean(dataHome.length) && dataEvents.map((item, index) => 
            slidesModes.push(
                <SwiperSlide key={index}>
                    <div className="Battle_logs_Card" >
                        <div className="Battle_logs_header" >
                            <span className="span_Battle_logs_header">

                            </span>

                            <span className="span_Battle_logs_header">
                                {
                                    Date.parse(`${item.endTime.slice(0, 4)+"-"+item.endTime.slice(4, 6)+"-"+item.endTime.slice(6, 11)+":"+item.endTime.slice(11, 13)+":"+item.endTime.slice(13)}`) - Date.now() < 1000*60 ?
                                        "ends now" :
                                        Date.parse(`${item.endTime.slice(0, 4)+"-"+item.endTime.slice(4, 6)+"-"+item.endTime.slice(6, 11)+":"+item.endTime.slice(11, 13)+":"+item.endTime.slice(13)}`) - Date.now() < 1000*60*60 ?
                                            "ends in about "+Math.floor((Date.parse(`${item.endTime.slice(0, 4)+"-"+item.endTime.slice(4, 6)+"-"+item.endTime.slice(6, 11)+":"+item.endTime.slice(11, 13)+":"+item.endTime.slice(13)}`) - Date.now())/(1000*60))+" minutes" :
                                            Date.parse(`${item.endTime.slice(0, 4)+"-"+item.endTime.slice(4, 6)+"-"+item.endTime.slice(6, 11)+":"+item.endTime.slice(11, 13)+":"+item.endTime.slice(13)}`) - Date.now() < 1000*60*60*24 ?
                                            "ends in about "+Math.floor((Date.parse(`${item.endTime.slice(0, 4)+"-"+item.endTime.slice(4, 6)+"-"+item.endTime.slice(6, 11)+":"+item.endTime.slice(11, 13)+":"+item.endTime.slice(13)}`) - Date.now())/(1000*60*60))+" hours" :
                                                Date.parse(`${item.endTime.slice(0, 4)+"-"+item.endTime.slice(4, 6)+"-"+item.endTime.slice(6, 11)+":"+item.endTime.slice(11, 13)+":"+item.endTime.slice(13)}` ) - Date.now() < 1000*60*60*24*30 ? 
                                                "ends in "+Math.floor((Date.parse(`${item.endTime.slice(0, 4)+"-"+item.endTime.slice(4, 6)+"-"+item.endTime.slice(6, 11)+":"+item.endTime.slice(11, 13)+":"+item.endTime.slice(13)}`) - Date.now())/(1000*60*60*24))+" days" : 
                                                "ends in "+Math.floor((Date.parse(`${item.endTime.slice(0, 4)+"-"+item.endTime.slice(4, 6)+"-"+item.endTime.slice(6, 11)+":"+item.endTime.slice(11, 13)+":"+item.endTime.slice(13)}`) - Date.now())/(1000*60*60*24*30))+" months"              
                                }
                            </span>
                        </div>
                        <div className="Battle_logs_body_name" style={{background: `${item.event.mode.startsWith("br") ? "#5475DF" :
                                                                        item.event.mode[0] === "g" ? "#7425BF" :
                                                                        item.event.mode.startsWith("hot") ? "#890E1C" :
                                                                        item.event.mode.startsWith("bos") ? "#900020" :
                                                                        item.event.mode.startsWith("hei") ? "#94379B" :
                                                                        item.event.mode.startsWith("boun") ? "#178185" :
                                                                        item.event.mode.startsWith("bask") ? "#BF4D0A" :
                                                                        item.event.mode.startsWith("duel") ? "#468CD5" :
                                                                        item.event.mode[0] === "s" ? "#5C9B15" :
                                                                        item.event.mode[0] === "d" ? "#5C9B15" :
                                                                        item.event.mode[0] === "k" ? "#9B3401" :
                                                                        "#5475DF"}`}}>

                            <img src={`https://media.brawltime.ninja/modes/${item.event.mode.startsWith("br") ? item.event.mode.split("B").join("-b").toLowerCase() :
                                                                                item.event.mode.startsWith("bos") ? item.event.mode.split("F").join("-f").toLowerCase() :
                                                                                item.event.mode.startsWith("baske") ? item.event.mode.split("B").join("-b").toLowerCase() :
                                                                                item.event.mode[0] === "g" ? item.event.mode.split("G").join("-g").toLowerCase() :
                                                                                item.event.mode[0] === "h" ? item.event.mode.split("Z").join("-z").toLowerCase() :
                                                                                item.event.mode[0] === "s" ? item.event.mode.split("S").join("-s").toLowerCase() :
                                                                                item.event.mode[0] === "d" ? item.event.mode.split("S").join("-s").toLowerCase() :
                                                                                item.event.mode.toLowerCase()}/icon.webp`} 
                                                                                className="Battle_logs_body_name_img" alt="icon"
                            />

                            <div className="Battle_logs_name_block">
                                <h2 className="Battle_logs_name_mode">{item.event.mode}</h2>
                                <h3 className="Battle_logs_name_map">{item.event.map !== "null" ? item.event.map : <></>}</h3>
                            </div>
                        </div>
                        <div className="Brawler_logs_stats" style={{backgroundImage: "url("+`https://media.brawltime.ninja/modes/${item.event.mode.startsWith("br") ? item.event.mode.split("B").join("-b").toLowerCase() :
                                                                                item.event.mode.startsWith("bos") ? item.event.mode.split("F").join("-f").toLowerCase() :
                                                                                item.event.mode.startsWith("baske") ? item.event.mode.split("B").join("-b").toLowerCase() :
                                                                                item.event.mode[0] === "g" ? item.event.mode.split("G").join("-g").toLowerCase() :
                                                                                item.event.mode[0] === "h" ? item.event.mode.split("Z").join("-z").toLowerCase() :
                                                                                item.event.mode[0] === "s" ? item.event.mode.split("S").join("-s").toLowerCase() :
                                                                                item.event.mode[0] === "d" ? item.event.mode.split("S").join("-s").toLowerCase() :
                                                                                item.event.mode.toLowerCase()}/background.webp`+")", backdropFilter: `brightness(50%)`}}>
                            <div className="flex justify-center items-center w-30">
                                <div className="w-28 h-28 flex justify-center">
                                    <img src={`https://media.brawltime.ninja/maps/${item.event.id}.webp`} alt='map' className="w-auto h-28" />
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            )
    )
    
    return(
        <main className="mainHome">
            <div className="flex items-center justify-center -mt-5">
                <img src={logo} alt="logo" className="lg:w-[450px] lg:h-auto w-[300px] h-[300px]"/>
            </div>
            
            <div className="input_there">
                <h1 className="text-xl font-medium mb-1">Input Your Brawl Stars Tag!</h1>
                    <input className="input_tag" type="text" placeholder="Enter your Tag" 
                        name={name} value={value} onChange={handleChange}
                    />
                    {/* Для задержки {data_tag !== [] && data_tag[0].tag === value 
                        ?
                        <Link to={`/Profile/${value.slice(1)}`} >
                            <button className="btn_tag" onClick={handleChange} > Search </button>
                        </Link> 
                        :
                        <button className="btn_tag" onClick={thatClick} > Search </button>
                    } */}
                    <Link to={`/Profile/${value.slice(1)}`} >
                        <button className="btn_tag" onClick={handleChange} > Search </button>
                    </Link>
                    
            </div>
            <div className="rank_swiper_main_div">
                <h1 className="text-md font-medium">Top-10 Players in Brawl Stars!</h1>
                    <div className="rank_swiper_and_btn">
                        <Swiper className="rank_swiper_main" 
                                style={{
                                    "--swiper-navigation-color": "#fff",
                                    "--swiper-pagination-color": "#fff",
                                }}
                                tag="section" 
                                wrapperTag="ul" 
                                slidesPerView={1}
                                spaceBetween={10}
                                slidesPerGroup={1}
                                grabCursor={true}
                                navigation={true}
                                breakpoints={{
                                    280:{
                                        slidesPerView:1,
                                    },
                                    480:{
                                        slidesPerView: 2,
                                        spaceBetween: 20,
                                        slidesPerGroup: 1
                                    },
                                    768:{
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                        slidesPerGroup: 1,
                                    },
                                    1024:{
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                        slidesPerGroup: 1,
                                    },
                                    1280:{
                                        slidesPerView: 4,
                                        spaceBetween: 20,
                                        slidesPerGroup: 1,
                                    },
                                    1536:{
                                        slidesPerView: 4,
                                        slidesPerGroup: 1,
                                    },
                                }
                                    
                                }
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination, Navigation, Thumbs]}
                            >
                                {slidesRankPlayers}
                        </Swiper>

                        <Link to={`/LeaderBoard`}>
                            <button className="btnToLeaders">Open LeaderBoard</button>
                        </Link>
                    </div>       
            </div>

            <div className="rank_swiper_main_div">
                <h1 className="text-md font-medium">Current events in Brawl Stars!</h1>
                    <div className="rank_swiper_and_btn">
                        <Swiper className="rank_swiper_main" 
                                style={{
                                    "--swiper-navigation-color": "#fff",
                                    "--swiper-pagination-color": "#fff",
                                }}
                                tag="section" 
                                wrapperTag="ul" 
                                slidesPerView={1}
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
                                        spaceBetween: 20,
                                        slidesPerGroup: 1
                                    },
                                    768:{
                                        slidesPerView: 2,
                                        spaceBetween: 20,
                                        slidesPerGroup: 1,
                                    },
                                    1024:{
                                        slidesPerView: 2,
                                        spaceBetween: 20,
                                        slidesPerGroup: 1,
                                    },
                                    1280:{
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                        slidesPerGroup: 1,
                                    },
                                    1536:{
                                        slidesPerView: 4,
                                        slidesPerGroup: 1,
                                    },
                                }
                                    
                                }
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination, Navigation, Thumbs]}
                            >
                                {slidesModes}
                        </Swiper>
                        </div>
            </div>
        </main>
    )
 }

 export default Home