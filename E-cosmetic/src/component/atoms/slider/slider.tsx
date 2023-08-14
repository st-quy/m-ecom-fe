import React from 'react'
import { Carousel } from 'antd'
import image from '../../../assets/image.png'



const Slider: React.FC = () => (
  <Carousel autoplay  className="container">
    <div>
     <img src={image} alt="Image 1" className="carousel__image" />
    </div>
    <div>
      <img src={image} alt="Image 2" className="carousel__image" />
    </div>
    <div>
      <img src={image} alt="Image 3" className="carousel__image" />
    </div>
  </Carousel>
);

export default Slider;

