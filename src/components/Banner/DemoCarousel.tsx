'use client'
import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

class DemoCarousel extends Component {
    render() {
        return (
            <div className='relative'>
                <Carousel autoPlay infiniteLoop showStatus={false} showIndicators={false} showThumbs={false} interval={3000}>
                    <div>
                        <img src="./images/slider/sliderImg_1.jpg" />
                    </div>
                    <div>
                        <img src="./images/slider/sliderImg_2.jpg" />
                    </div>
                    <div>
                        <img src="./images/slider/sliderImg_3.jpg" />
                    </div>
                    <div>
                        <img src="./images/slider/sliderImg_4.jpg" />
                    </div>
                </Carousel>
                <div className='w-full h-40 bg-gradient-to-t from-gray-100 to-transparent absolute bottom-0 z-20'></div>
            </div>
        );
    }
};

export default DemoCarousel;