import React from 'react'
import { Carousel } from 'antd'

const Slider: React.FC = () => (
  <Carousel autoplay>
    <div>
      <img
        src='https://66.media.tumblr.com/fe145659a6cfc6946fefcbe44cb0f112/tumblr_ptrsoh3n6F1sqskkro2_1280.jpg'
        alt='Image 1'
        className='carousel__image'
      />
    </div>
    <div>
      <img
        src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhUaqG5657IFlvhy1GnX1AUkQL_38J3_8ORXuxG1eh4jNRMM1JUB1qZwCN7nVkY6MmeKeJJamtMk___6ep56nRKv7aS2nmlDr1d1zk2D0LNYnAr_rHtxovnfI6LUzwxx3-_Dg7QVH2jJ6KO9Rmyxl37JVMSOKf6Hz1_p4rgvVNXreoGOytpdz2Q--IdmA/s1600/dior-holiday-2022-the-atelier-of-dreams-makeup-collection-review-swatches-1.jpeg'
        alt='Image 1'
        className='carousel__image'
      />
    </div>
    <div>
      <img
        src='https://eco-beauty.dior.com/dw/image/v2/BDGF_PRD/on/demandware.static/-/Sites-master_dior/default/dw1dcbd9ec/assets/Y4001045/Y4001045_C400100354_E01_ZHC.jpg'
        alt='Image 1'
        className='carousel__image'
      />
    </div>
  </Carousel>
)

export default Slider
