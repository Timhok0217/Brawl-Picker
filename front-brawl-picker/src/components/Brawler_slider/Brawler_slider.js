import React from "react";
import Bralwer_Card from "./Brawler_Card";

function Brawler_slider ({
    brawlers, ...props
}) {
    const [carousel, setCarousel] = React.useState(0)

    //Можно использовать вместо useRef
    //let box = document.querySelector(".Brawlers_slider")
    const ref = React.useRef(null)

    
    // Вариант с пролистыванием 1 карточки
    // const prev_carousel = () => {
    //     const index = carousel > 0 ? carousel - 1 : brawlers[0].length - 1
    //     setCarousel(index) 
    // }

    // const next_carousel = () => {
    //     const index = carousel < brawlers[0].length - 1 ? carousel + 1 : 0
    //     setCarousel(index) 
    // }

    const prev_carousel = () => {
        let width = ref.current.clientWidth
        ref.current.scrollLeft = ref.current.scrollLeft - width
        console.log(ref.current.scrollLeft)
        console.log("a", ref.current.scrollLeft - ref.current.clientWidth)

        let items_per_screen=ref.current.style
        // parseInt(ref.style.getPropertyValue("--items-per-screen"))
        console.log(items_per_screen)
        const index = carousel > 0 ? carousel - 1 : brawlers[0].length - 1
        setCarousel(index)
    }

    const next_carousel = () => {
        let width = ref.current.clientWidth
        ref.current.scrollLeft = ref.current.scrollLeft + width
        console.log(ref.current.scrollLeft)
        
        const index = carousel < brawlers[0].length - 1 ? carousel + 1 : 0
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
                <button className="handle handle_right" onClick={next_carousel}></button>
            </div>
            <div className="slider-indicators">
                {Boolean(brawlers.length) && brawlers[0].map((item, index) => (
                    <div className="indicator"></div>
                ))}
                
            </div>
        </div>
        
    )
}

export default Brawler_slider