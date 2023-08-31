import React from 'react'
import { Button, Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { DecodedToken } from '~/helpers/api'

const Footer: React.FC = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('accessToken')
  const decodedToken = jwt_decode<DecodedToken>(token as string)

  return (
    <footer>
      <Row>
        <Col className='footer-col' xs={8} sm={8} md={5} lg={5} xl={5}>
          <img
            src='https://cdn.dribbble.com/users/822220/screenshots/14628147/cosmetic_shop_logo_design.png'
            alt=''
            className='footer-logo'
          />
        </Col>
        <Col className='footer-col' xs={5} sm={4} md={5} lg={4} xl={3}>
          <p>About</p>
          <p>Service</p>
        </Col>
        <Col className='footer-col' xs={5} sm={4} md={5} lg={4} xl={3}>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Linkedin</p>
          <p>Instagram</p>
        </Col>
      </Row>
      {decodedToken.role === 'admin' && (
        <Row>
          <Col
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              paddingRight: '20px',
              paddingBottom: '20px'
            }}
          >
            <Button onClick={() => navigate('/dashboard')}> Go to dashboard </Button>
          </Col>
        </Row>
      )}
    </footer>
  )
}
export default Footer
