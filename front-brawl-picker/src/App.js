import React from "react";
import axios from "axios";
import Header from "./components/Header";


/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function App () {

    const [tag, setTag] = React.useState({
        ent_tag: ''
    })

    const [show_tag, setShow_tag] = React.useState(false)



    function Keep_tag (event) {
        const {name, value, type} = event.target
        setTag(prev => {
            return{
                ...prev,
                [name]: value
            }
        })
    }

    const res = e =>{
        e.preventDefault()

    }

    const API_URL = 'http://127.0.0.1:8000/api/'

    function sendToBack() {
        axios({
            method: 'post',
            url: API_URL,
            data: tag,
        })
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }
    const [data,setData] = React.useState({
        data:''
    })

    React.useEffect( () => {
        async function getFromBAck() {
            console.log('getFromBAck')
            const response = await axios({
                method: 'get',
                url: API_URL
            })
                .then(res => console.log(res))
                .catch(err => console.error(err))
        }
        getFromBAck()
    }, [data])

        // axios.post(API_URL, tag)
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

    function Take_tag (){
        setShow_tag(prev => !prev)
    }

    return(
        <div>
            <Header />
            <main>
                <div className="input_there">
                    <h1>Input will be there!</h1>
                    <input className="input_tag" type="text" placeholder="Enter your Tag" name="ent_tag" value={tag.ent_tag} onChange={Keep_tag} />
                    <button className="btn_tag" onClick={sendToBack} > Search </button>
                    {show_tag ? <h1>{tag.ent_tag}</h1> : <></>}
                </div>
            </main>
        </div>
    )
}

 export default App