import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import banner8 from '../../assets/image/banner8.png'
import banner9 from '../../assets/image/banner9.jpg'
import banner10 from '../../assets/image/banner10.jpg'
import banner11 from '../../assets/image/banner11.jpg'






const Slider = () => {
    return (
        <div >

        <Carousel infiniteLoop={true} autoPlay={true} interval={2000}>
            

                <div className="h-[400px]">
                    <img src={banner8} />
                    <p className="legend"></p>
                </div>
                <div className="h-[400px]">
                    <img src={banner9} />
                    <p className="legend"></p>
                </div> 
                <div className="h-[400px]">
                    <img src={banner10} />
                    <p className="legend"></p>
                </div>
                <div className="h-[400px]">
                    <img src={banner11} />
                    <p className="legend"></p>
                </div>
            

        </Carousel>
        </div>

    )
}
export default Slider