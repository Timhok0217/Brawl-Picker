import React from "react";
import {Link, useResolvedPath, useMatch} from "react-router-dom";

 function Home ({
     name,
     value, handleChange, handleClick,
     ...props

                }) {
<<<<<<< HEAD
=======

>>>>>>> fac9f429b088a911c15a7f7bed0003dea00c1a2c
    return(
        <main>
                <div className="input_there">
                    <h1 className="text-xl font-medium mb-1">Input will be there!</h1>
                    <input className="input_tag" type="text" placeholder="Enter your Tag" name={name} value={value} onChange={handleChange} />
<<<<<<< HEAD
                    <Link to="/Profile"> 
                        <button className="btn_tag" onClick={handleClick} > Search </button>
                    </Link>
                    
=======
                    <Link to="/Profile">
                        <button className="btn_tag" onClick={handleClick} > Search </button>
                    </Link>

>>>>>>> fac9f429b088a911c15a7f7bed0003dea00c1a2c
                </div>
            </main>
    )
 }

 export default Home