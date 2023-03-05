import React, {useEffect} from "react";
import {Link, useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";

import axios from "axios";


const APILEADERS_URL = 'http://127.0.0.1:8000/apiHome/'

function LeaderBoard () {

    const [dataLeaderBoard, setDataLeaderBoard] = React.useState([])
    const [dataRankPlayers, setDataRankPlayers] = React.useState([])
    const [dataRankBrawlers, setDataRankBrawlers] = React.useState([])

    //Берет инфу с адресной строки
    //const {brawlerId} = useParams()

    const [brawlerName, setBrawlerName] = React.useState({
        ent_name: 'shelly'
    })

    const [toggleSearch, setToggleSearch] = React.useState(true)
    function toggleSearchBrawler (event) {
        setToggleSearch(prev => !prev)
        keepBrawlerName(event)
    }

    useEffect(()=>{
        (async ()=>{
            await axios({
                method: 'post',
                url: APILEADERS_URL,
                data: {
                    dataLeaderBoard: [],
                    ent_name:`${brawlerName.ent_name}`,
                },
            })
                .then(res => setDataLeaderBoard(res.data))
                .catch(err => console.error(err))
        })()
        //console.log(dataLeaderBoard)
        console.log(brawlerName.ent_name)
    }, [toggleSearch])

    useEffect(() => {
        localStorage.setItem("dataLeaderBoard", JSON.stringify(dataLeaderBoard))
        //localStorage.clear()
        //console.log(JSON.parse(localStorage.getItem("dataLeaderBoard")))
    }, [dataLeaderBoard])

    useEffect(()=>{
        const player = Boolean(dataLeaderBoard.length) &&  dataLeaderBoard[0].rankPlayers.replace(/None/g, '"None"').replace(/Box\(/g, '').replace(/\)/g, '').replaceAll("\'", '"').replace(/([а-яёa-z0-9])"(?=[а-яёa-z0-9])/ig, "$1'").replace(/(🍷)"(♡)/gi, "$1'♡").replace(/(\s)"(\/)/g, "$1'/")
        const brawler = Boolean(dataLeaderBoard.length) &&  dataLeaderBoard[0].rankBrawlers.replace(/None/g, '"None"').replace(/Box\(/g, '').replace(/\)/g, '').replaceAll("\'", '"').replace(/([а-яёa-z0-9])"(?=[а-яёa-z0-9])/ig, "$1'").replace(/(🍷)"(♡)/gi, "$1'♡").replace(/(\s)"(\/)/g, "$1'/")
        const resPlayer = JSON.parse(player)
        const resBrawler = JSON.parse(brawler)
        Boolean( dataLeaderBoard.length) ? setDataRankPlayers(resPlayer) : <></>
        Boolean( dataLeaderBoard.length) ? setDataRankBrawlers(resBrawler) : <></>
        //console.log(player, resPlayer)
        //console.log(brawler, resBrawler)
        //console.log("log", dataRankPlayers)
    }, [dataLeaderBoard])

    function keepBrawlerName (event) {
        const {name, value} = event.target
        setBrawlerName(prev => {
            return{
                ...prev,
                [name]: value,
            }
        })
    }

    const [toggleBrawlers, setToggleBrawlers] = React.useState(false)
    const [togglePlayer, setTogglePlayer] = React.useState(true)
    function handleToggleBrawlers (event) {
        if (togglePlayer) {
            setToggleBrawlers(prev => !prev)
            setTogglePlayer(prev => !prev)
        } else {
            setToggleBrawlers(prev => !prev)
        }
    }

    function handleTogglePlayer (event) {
        if (!togglePlayer) {
            setTogglePlayer(prev => !prev)
        } 
        if (toggleBrawlers) {
            setToggleBrawlers(prev => !prev)
        }
    }

    function handleKeyDown (event) {
        if (event.key === 'Enter') {
            toggleSearchBrawler(event)
        }
    }

    return(
        <div className="LeaderBoard-main">
            <h1 className="text-xl font-medium mt-4 mb-1 text-center">Brawl Stars Trophies Leaderboard</h1>
            <div className="LeaderBoard-wrapper"> 
                <div className="text-xl my-4">Top 20 players by all trophies or on some brawler!</div>
                <div className="LeaderBoard-btn-input">
                    <div className="flex justify-around">
                        <button className="LeaderBoard-player" onClick={handleTogglePlayer} autoFocus>Players</button>
                        <button className="LeaderBoard-brawlers" onClick={handleToggleBrawlers} >Brawlers</button>
                    </div>
                    {Boolean(toggleBrawlers) && <div className="LeaderBoard-brawlers-input-wrapper">
                        <input className="LeaderBoard-brawlers-input" type="text" placeholder="Enter brawler name" 
                            name={"ent_name"} value={brawlerName.ent_name} onChange={keepBrawlerName} 
                            onKeyDown={handleKeyDown} tabIndex="0"
                        />
                        <button className="LeaderBoard-brawlers-input-btn" onClick={toggleSearchBrawler}>Search</button>
                    </div>}
                </div>

                <ul className="LeaderBoard-list">
                    {/* <li className="Top players"><div>Top 20 players</div></li> */}
                    {Boolean(dataLeaderBoard) && togglePlayer ? dataRankPlayers.map((item, index) =>
                        <Link to={`/Profile/${item.tag.slice(1)}`} key={index}> 
                            <li className="flex justify-between items-center my-3" key={index}><div className="flex gap-3 items-center"><span className="w-5 text-end">{index+1}</span> <div className="flex gap-2 items-center"><img src={`https://media.brawltime.ninja/avatars/${item.icon.id}.webp`} className="w-9 h-9"/> <span className="font-medium">{item.name}</span></div></div> <span>{item.trophies}</span></li>
                        </Link>
                    ) : dataRankBrawlers.map((item, index) => 
                        <Link to={`/Profile/${item.tag.slice(1)}`} key={index}>
                            <li className="flex justify-between items-center my-3" key={index}><div className="flex gap-3 items-center"><span className="w-5 text-end">{index+1}</span> <div className="flex gap-2 items-center"><img src={`https://media.brawltime.ninja/avatars/${item.icon.id}.webp`} className="w-9 h-9"/> <span className="font-medium">{item.name}</span></div></div> <span>{item.trophies}</span></li>
                        </Link>
                    )}
                </ul>
            </div>
        </div>
        

            
    )
}

export default LeaderBoard