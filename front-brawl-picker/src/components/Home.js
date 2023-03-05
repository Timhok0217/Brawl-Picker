import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/thumbs"

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

    const [dataHome, setDataHome] = React.useState([])
    const [dataRankPlayers, setDataRankPlayers] = React.useState([])
    //const [dataRankBrawlers, setDataRankBrawlers] = React.useState([])

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
        const l = Boolean(dataHome.length) && dataHome[0].rankPlayers.replace(/None/g, '"None"').replace(/Box\(/g, '').replace(/\)/g, '').replaceAll("\'", '"').replace(/([а-яёa-z0-9])"(?=[а-яёa-z0-9])/ig, "$1'").replace(/(🍷)"(♡)/gi, "$1'♡").replace(/(\s)"(\/)/g, "$1'/")
        const res = JSON.parse(l)
        Boolean(dataHome.length) ? setDataRankPlayers(res) : <></>
        console.log(l, res)
        console.log("log", dataRankPlayers)
    }, [dataHome])


    const slidesRankPlayers = []
    Boolean(dataHome.length) && dataRankPlayers.map((item, index)=>
        (index<10)&&slidesRankPlayers.push(
            <SwiperSlide key={index}>
                <Link to={`/Profile/${item.tag.slice(1)}`} >
                <div className="Card_rank">
                    <div className="Card_rank_header">
                        <div className="flex items-center"><img src={`https://media.brawltime.ninja/avatars/${item.icon.id}.webp`} className="w-12 h-12" /> <span className="ml-4">{item.name}</span></div>  <span className="text-white font-medium rounded-full bg-input_tag  w-6 h-6 text-center">{item.rank}</span>
                    </div>
                    
                    <div className="Card_rank_body">
                        <span>Trophies</span><div className="flex justify-center items-center "><span className="mx-2"><img src="https://cdn.brawlify.com/icon/trophy.png" className="w-4 h-4" alt="new"/></span> <span>{item.trophies}</span></div>
                    </div>        
                </div>
                </Link>
            </SwiperSlide>
        )
    )
    
    return(
        <main className="mainHome">
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
        </main>
    )
 }

 export default Home