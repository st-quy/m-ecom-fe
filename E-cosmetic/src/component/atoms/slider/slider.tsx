import React from 'react'
import { Carousel } from 'antd'




const Slider: React.FC = () => (
  <Carousel autoplay  >
    <div>
     <img src="../../../../src/assets/1541.jpg" alt="Image 1" className="carousel__image" />
    </div>
    <div>
    <img src="../../../../src/assets/2403.jpg" alt="Image 1" className="carousel__image" />
    </div>
    <div>
    <img src="../../../../src/assets/2403.jpg" alt="Image 1" className="carousel__image" />
    </div>
  </Carousel>
);

export default Slider;

