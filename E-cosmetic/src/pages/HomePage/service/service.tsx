/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Row, Col, Typography, Divider } from 'antd'
import Header from '../header/header'
import Footer from '../footer/footer'
import Slider from '~/component/atoms/slider/slider'

const { Title } = Typography

const Service = () => {
  return (
    <>
      <Header />
      <Slider />
      <div style={{ padding: '24px' }}>
        <Row justify='center'>
          <Col span={24}>
            <div style={{ textAlign: 'center' }}>
              <Divider style={{ borderColor: 'black' }}>
                <Title level={2}>Our Services</Title>
              </Divider>
            </div>
          </Col>
        </Row>
        <Row justify='center'>
          <Col span={16}>
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <p>
                We offer a wide range of services to meet your needs. Whether you're looking for web development, mobile
                app development, graphic design, or digital marketing, we've got you covered.
              </p>
              <p>
                Our team of experts is dedicated to delivering high-quality solutions that help businesses succeed in
                the digital world. From concept to execution, we work closely with our clients to ensure that their
                vision is brought to life.
              </p>
              <p>Some of our key services include:</p>
              <ul>
                <li>
                  Web Development: We create responsive and user-friendly websites tailored to your specific
                  requirements.
                </li>
                <li>Mobile App Development: We develop native and cross-platform mobile apps for iOS and Android.</li>
                <li>
                  Graphic Design: Our designers create visually appealing graphics for branding, marketing materials,
                  and more.
                </li>
                <li>
                  Digital Marketing: We implement effective digital marketing strategies to increase online visibility
                  and drive traffic to your website.
                </li>
                <li>
                  UI/UX Design: We focus on delivering seamless user experiences through intuitive interface design.
                </li>
              </ul>
              <p>
                Whatever your business goals are, we are here to help you achieve them. Contact us today to discuss how
                we can assist you in reaching your digital objectives.
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  )
}

export default Service
