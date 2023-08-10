import React from 'react';
import { Carousel } from 'antd';
import image1 from '../assets/image1.jpg';
import image from '../assets/image.png';
import image2 from '../assets/image2.jpg';
import "./silder.scss";



const Slider: React.FC = () => (
  <Carousel autoplay  className="container">
    <div>
     <img src={image1} alt="Image 1" className="carousel__image" />
    </div>
    <div>
      <img src={image} alt="Image 2" className="carousel__image" />
    </div>
    <div>
      <img src={image2} alt="Image 3" className="carousel__image" />
    </div>
  </Carousel>
);

export default Slider;

