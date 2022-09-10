import React from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

    return(
        <main>
            <div className="input_there">
                    <h1 className="text-xl font-medium mb-1">Input will be there!</h1>
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
            </main>
    )
 }

 export default Home