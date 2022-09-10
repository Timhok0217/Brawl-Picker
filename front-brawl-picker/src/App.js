import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Profile from "./components/Profile";
import MapTierList from "./components/MapTierList";
import BrawlTierList from "./components/BrawlTierList";
import FooterPhone from "./components/FooterPhone";
import About from "./components/About";
const API_URL = 'http://127.0.0.1:8000/api/'

function App () {

    const [tag, setTag] = React.useState({
        ent_tag: ''
    })

    //const [show_tag, setShow_tag] = React.useState(false)

    // const [data, setData] = React.useState(JSON.parse(localStorage.getItem("data_tag")) || {
    //     data: ""
    // })

    function Keep_tag (event) {
        const {name, value} = event.target
        setTag(prev => {
            return{
                ...prev,
                [name]: value
            }
        })
    }

    // async function sendToBack() {
    //     await axios({
    //         method: 'post',
    //         url: API_URL,
    //         data: tag,
    //     })
    //         //.then(res => console.log(res))
    //         .then(res => setData(res))
    //         .catch(err => console.error(err))
    //     setShow_tag(prev => !prev)
    // }

    // React.useEffect ( () => {
    //     localStorage.setItem("data_tag", JSON.stringify(data))
    //     //localStorage.clear()
    // }, [data])


    return(
        <div>
            <Header />
            <Routes>
                <Route 
                    path="/"
                    element={
                        <Home
                            name={"ent_tag"} 
                            value={tag.ent_tag}
                            handleChange={Keep_tag}
                        />}
                />
                <Route 
                    path="/Profile/:brawlId"
                    element={<Profile />}
                />
                <Route 
                    path="/BrawlTierList"
                    element={<BrawlTierList/>}
                />
                <Route 
                    path="/MapTierList"
                    element={<MapTierList/>}
                />
                <Route
                    path="/About"
                    element={<About/>} 
                />
            </Routes>
            <div className="flex lg:hidden">
                <FooterPhone/>
            </div>
        </div>
    )
}

 export default App