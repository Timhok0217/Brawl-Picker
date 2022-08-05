import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Profile from "./components/Profile";
import MapTierList from "./components/MapTierList";
import BrawlTierList from "./components/BrawlTierList";

function App () {

    const [tag, setTag] = React.useState({
        ent_tag: ''
    })

    const [show_tag, setShow_tag] = React.useState(false)

    const [data, setData] = React.useState(JSON.parse(localStorage.getItem("data_tag")) || {
<<<<<<< HEAD
        data: {
            name: ""
        }
    })
=======
        data: ''
    })

    //const [best_try, setBest_try] = React.useState(JSON.parse(localStorage.getItem("data_tag")) || {data: ''})


    // if (roll_count<best_try) {
    //     localStorage.setItem("data_tag", JSON.stringify(roll_count))
    // }
>>>>>>> fac9f429b088a911c15a7f7bed0003dea00c1a2c

    function Keep_tag (event) {
        const {name, value} = event.target
        setTag(prev => {
            return{
                ...prev,
                [name]: value
            }
        })
    }

    const API_URL = 'http://127.0.0.1:8000/api/'

    //Отпрака тега на backend
    function sendToBack() {
        axios({
            method: 'post',
            url: API_URL,
            data: tag,
        })
            //.then(res => console.log(res))
            .then(res => setData(res))
            .catch(err => console.error(err))
        setShow_tag(prev => !prev)
<<<<<<< HEAD
=======
        //console.log(show_tag)
        //localStorage.setItem("data_tag", JSON.stringify(data))
        //console.log(data.data[0])
>>>>>>> fac9f429b088a911c15a7f7bed0003dea00c1a2c
    }

    React.useEffect ( () => {
        localStorage.setItem("data_tag", JSON.stringify(data))
        //localStorage.clear()
    }, [data])
<<<<<<< HEAD
    


    //Сбор данных с сервера backend
    React.useEffect( () => {
        async function getFromBAck() {
            await axios({
                method: 'get',
                url: API_URL
            })
                .then(res => setData(res))
                .catch(err => console.error(err))
        }
        getFromBAck()
        console.log(data.data[0])
        //localStorage.setItem("data_tag", JSON.stringify(data))
        //console.log("state_from_back:", data)
    }, [])
=======



    //Сбор данных с сервера backend
    // React.useEffect( () => {
    //     async function getFromBAck() {
    //         await axios({
    //             method: 'get',
    //             url: API_URL
    //         })
    //             .then(res => setData(res))
    //             .catch(err => console.error(err))
    //     }
    //     getFromBAck()
    //     console.log(data.data[0])
    //     localStorage.setItem("data_tag", JSON.stringify(data))
    //     console.log("state_from_back:", data)
    // }, [])
>>>>>>> fac9f429b088a911c15a7f7bed0003dea00c1a2c

    return(
        <div>
            <Header />
            <Routes>
<<<<<<< HEAD
                <Route 
                    path="/"
                    element={
                        <Home
                            name={"ent_tag"} 
=======
                <Route
                    path="/"
                    element={
                        <Home
                            name={"ent_tag"}
>>>>>>> fac9f429b088a911c15a7f7bed0003dea00c1a2c
                            value={tag.ent_tag}
                            handleChange={Keep_tag}
                            handleClick={sendToBack}
                            //data={data.data[0]}
                        />}
                />
<<<<<<< HEAD
                <Route 
                    path="/Profile"
                    element={<Profile data={data.data[0]} />}
                />
                <Route 
                    path="/BrawlTierList"
                    element={<BrawlTierList/>}
                />
                <Route 
=======
                <Route
                    path="/Profile"
                    element={<Profile data={data.data[0]} />}
                />
                <Route
                    path="/BrawlTierList"
                    element={<BrawlTierList/>}
                />
                <Route
>>>>>>> fac9f429b088a911c15a7f7bed0003dea00c1a2c
                    path="/MapTierList"
                    element={<MapTierList/>}
                />
            </Routes>
        </div>
    )
}

 export default App