import { Row, Col, Typography, Divider } from 'antd'
import Header from '../HomePage/header/header'
import Footer from '../HomePage/footer/footer'
import Slider from '~/component/atoms/slider/slider'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

const { Title } = Typography

const About = () => {
  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const orderId = searchParams.get('orderId')
    const message = searchParams.get('message')

    // Đẩy dữ liệu lên API
    const postData = async () => {
      try {
        const response = await axios.post('https://ecom-be-htgu.onrender.com/checkout/savedata', {
          orderId,
          message
        })
        console.log('Dữ liệu đã được đẩy lên API thành công')
        console.log(message)
        console.log(message)
      } catch (error) {
        console.error('Lỗi khi đẩy dữ liệu lên API:', error)
        console.log(orderId, message)
      }
    }

    postData()
  }, [location.search])

  return (
    <>
      <Header />
      <Slider />
      <div style={{ padding: '24px' }}>
        <Row justify='center'>
          <Col span={24}>
            <div style={{ textAlign: 'center' }}>
              <Divider style={{ borderColor: 'black' }}>
                <Title level={2}>About Us</Title>
              </Divider>
            </div>
          </Col>
        </Row>
        <Row justify='center'>
          <Col span={16}>
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend enim eu ligula tincidunt
                consequat. Mauris sed tortor eget magna tristique ullamcorper. Donec pellentesque molestie libero, quis
                dapibus dui tincidunt nec. Proin gravida, dui nec fermentum ullamcorper, urna ipsum ultrices nisl, at
                viverra eros odio non nunc. Nullam consectetur nulla in venenatis dignissim.
              </p>
              <p>
                Vivamus consectetur metus non risus feugiat, eget volutpat lorem consectetur. Suspendisse finibus,
                tellus eget placerat feugiat, neque purus fringilla dui, vitae aliquam ipsum velit id dui. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque in felis ac
                diam eleifend convallis. Proin non libero ac dui ullamcorper fermentum. Ut tincidunt urna nec turpis
                interdum, id consequat tortor volutpat. Donec sed metus euismod, tristique est sed, dignissim risus.
                Donec facilisis felis nec turpis commodo consectetur.
              </p>
              <p>
                Nulla facilisi. Donec non turpis ut nulla faucibus convallis. Nullam a urna at risus tincidunt feugiat
                in non mi. Morbi ullamcorper tellus nec dui lacinia, sit amet faucibus mauris efficitur. Aenean
                eleifend, ante non scelerisque lobortis, nibh quam iaculis sem, vel rhoncus erat lectus ut risus. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada tellus id sapien porttitor, ut
                lobortis eros efficitur. Sed scelerisque orci nec eros pellentesque, non eleifend odio facilisis. Nulla
                facilisi.
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  )
}

export default About
