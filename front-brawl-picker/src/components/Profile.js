/* eslint-disable react/jsx-pascal-case */
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Brawler_slider from "./Brawler_slider/Brawler_slider";
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import {Swiper, SwiperSlide} from "swiper/react"
//import Progress_bar from "./Brawler_slider/Progress_bar";
//import Bralwer_Card from "./Brawler_slider/Brawler_Card";
//import Card_icon from "https://cdn.brawlify.com/brawler/Bibi.png"
const API_URL = 'http://127.0.0.1:8000/api/'
function Profile () {

    const {brawlId} = useParams()
    //const [data, setData] = React.useState([])
    const [data, setData] = React.useState(JSON.parse(localStorage.getItem("data_tag")) || [])
    const [brawlers, setBrawlers] = React.useState([])
    const [battle_logs, setBattle_logs] = React.useState([])
    
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
        const l = Boolean(data.length) && data[0].battle_logs.replace(/None/g, '"None"').replace(/Box\(/g, '').replace(/\)/g, '').replaceAll("\'", '"').replace(/([а-яёa-z])"(?=[а-яёa-z])/ig, "$1'")
        const res = JSON.parse(l)
        //console.log("parse", res)
        Boolean(data.length) ? setBrawlers(eval('{[' + data[0].brawlers + ']}')) : <></>
        Boolean(data.length) ? setBattle_logs(res) : <></>
        console.log("brawlers_obj", brawlers)
        console.log("battle_log", battle_logs)
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
                </div>
            </div>
        </div>
    )
}

export default Profile