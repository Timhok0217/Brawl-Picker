import React from "react";
import {Link, useResolvedPath, useMatch} from "react-router-dom";

 function Home ({
     name,
     value, handleChange, handleClick,
     ...props

                }) {

    return(
        <main>
                <div className="input_there">
                    <h1 className="text-xl font-medium mb-1">Input will be there!</h1>
                    <input className="input_tag" type="text" placeholder="Enter your Tag" name={name} value={value} onChange={handleChange} />
                    <Link to="/Profile">
                        <button className="btn_tag" onClick={handleClick} > Search </button>
                    </Link>

                </div>
            </main>
    )
 }

 export default Home