import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Profile from "./components/Profile";
import LeaderBoard from "./components/LeaderBoard";
import FooterPhone from "./components/FooterPhone";
import About from "./components/About";
import NotFound from "./components/NotFound";
import Club from "./components/Club";
import Footer from "./components/Footer";

const API_URL = 'http://127.0.0.1:8000/api/'

function App () {

    const [tag, setTag] = React.useState({
        ent_tag: ''
    })


    function Keep_tag (event) {
        const {name, value} = event.target
        setTag(prev => {
            return{
                ...prev,
                [name]: value
            }
        })
    }


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
                    path="/LeaderBoard"
                    element={<LeaderBoard/>}
                />
                <Route 
                    path="/Club/:clubTag"
                    element={<Club />}
                />
                <Route
                    path="/About"
                    element={<About/>} 
                />
                <Route 
                    path="*"
                    element={<NotFound/>} 
                />
            </Routes>
            <div className="flex lg:hidden">
                <FooterPhone/>
            </div>
            <div className="hidden lg:flex" >
                <Footer />
            </div>
        </div>
    )
}

 export default App