import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import "swiper/css/thumbs"
import {Swiper, SwiperSlide} from "swiper/react"
import SwiperCore from "swiper"
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
    const [dataRank, setDataRank] = React.useState([])
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
        const l = Boolean(dataHome.length) && dataHome[0].all.replace(/None/g, '"None"').replace(/Box\(/g, '').replace(/\)/g, '').replaceAll("\'", '"').replace(/([а-яёa-z0-9])"(?=[а-яёa-z0-9])/ig, "$1'").replace(/(🍷)"(♡)/gi, "$1'♡").replace(/(\s)"(\/)/g, "$1'/")
        const res = JSON.parse(l)
        Boolean(dataHome.length) ? setDataRank(res) : <></>
        //console.log(l, res)
        console.log("log", dataRank)
    }, [dataHome])

    const slidesRankPlayers = [];
    Boolean(dataHome.length) && dataRank.map((item, index)=>
        slidesRankPlayers.push(
            <SwiperSlide key={index}>
                <div className="Card_rank">
                    <div className="Card_rank_header">
                        <span>{item.name}</span> <span className="text-white font-medium rounded-full bg-input_tag  w-6 h-6 text-center">{item.rank}</span>
                    </div>
                    <div className="flex justify-center my-5"> <img src={`https://media.brawltime.ninja/avatars/${item.icon.id}.webp?size=80`}></img></div>
                    <div className="Card_rank_body">
                        <span>Trophies</span><div className="flex justify-center items-center "><span className="mx-2"><img src="https://cdn.brawlify.com/icon/trophy.png" className="w-4 h-4" alt="new"/></span> <span>{item.trophies}</span></div>
                    </div>        
                </div>
            </SwiperSlide>
        ))


    return(
        <main>
            <div className="input_there">
                    <h1 className="text-xl font-medium mb-1">Input Your Brawl Stars Tag!</h1>
                    <input className="input_tag" type="text" placeholder="Enter your Tag" name={name} value={value} onChange={handleChange} />
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
                <h1 className="text-md font-medium ">Top-10 Players in Brawl Stars!</h1>
                        <Swiper className="rank_swiper_main" 
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
                                    slidesPerGroup: 2,
                                },
                                1024:{
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                    slidesPerGroup: 3,
                                },
                                1280:{
                                    slidesPerView: 4,
                                    spaceBetween: 10,
                                    slidesPerGroup: 4,
                                },
                                1536:{
                                    slidesPerView: 4,
                                    slidesPerGroup: 4,
                                },
                            }
                                
                            }
                            pagination={{
                                clickable: true,
                                }}
                            modules={[Pagination, Navigation]}
                        >
                            {slidesRankPlayers}
                        </Swiper>
                    </div>
        </main>
    )
 }

 export default Home