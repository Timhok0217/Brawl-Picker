import React from "react";
import Bralwer_Card from "./Brawler_Card";


function Brawler_slider ({
    brawlers, ...props
}) {
    const [carousel, setCarousel] = React.useState(0)
    const ref = React.useRef(null)
    const [arr, setArr] = React.useState([])

    const prev_carousel = () => {
        let width = ref.current.clientWidth
        ref.current.scrollLeft = ref.current.scrollLeft - width

        let items_per_screen = Math.floor(getComputedStyle(ref.current).getPropertyValue("--items-per-screen"))
        //console.log(items_per_screen)
        const index = carousel > 0 ? carousel - items_per_screen : brawlers[0].length - items_per_screen
        setCarousel(index)

    }

    const next_carousel = () => {
        let width = ref.current.clientWidth
        ref.current.scrollLeft = ref.current.scrollLeft + width
        
        let items_per_screen = Math.floor(getComputedStyle(ref.current).getPropertyValue("--items-per-screen"))
        //console.log(items_per_screen)
        const index = carousel < brawlers[0].length - items_per_screen ? carousel + items_per_screen : 0
        setCarousel(index) 

    }


    return(
        <div className="Brawlers_slider_progbar">
            <div className="Brawlers_block"> 
                <button className="handle handle_left" onClick={prev_carousel}  > </button>
                {/* style={{transform: `translateX(${(-carousel ) * 100}%)`}}  */}
                <div className="Brawlers_slider"  ref={ref}>
                    {Boolean(brawlers.length) &&
                        brawlers[0].map((item, index) =>
                            <Bralwer_Card item={item} key={index} /> 
                        )
                    }   
                </div>                    
                <button className="handle handle_right" onClick={next_carousel}> </button>
            </div>

        </div>
        
    )
}

export default Brawler_slider