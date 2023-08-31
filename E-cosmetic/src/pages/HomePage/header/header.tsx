/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ShoppingCartOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Row, Badge } from 'antd'
import { useTokenDecoding } from '~/helpers/api'

const Header: React.FC = () => {
  const [accessToken, decodedToken] = useTokenDecoding()
  const navigate = useNavigate()

  return (
    <header>
      <div className='header'>
        <Row className='header-row'>
          <Col className='col col__image' xs={5} sm={4} md={5} lg={5} xl={8}>
            <Link to='/'>
              <img
                className='col_image__logo'
                src='https://cdn.dribbble.com/users/822220/screenshots/14628147/cosmetic_shop_logo_design.png'
                alt='Logo'
              />
            </Link>
          </Col>
          <Col xl={10} md={8} lg={8}>
            <div className='tags-navigation'>
              <Col className='tags' xs={5} sm={4} md={5} lg={5} xl={3}>
                <p>
                  <Link style={{ color: 'white' }} to='/'>
                    Home
                  </Link>
                </p>
              </Col>
              <Col className='tags' xs={5} sm={4} md={5} lg={5} xl={3}>
                <p>
                  <Link style={{ color: 'white' }} to='/about'>
                    About
                  </Link>
                </p>
              </Col>
              <Col className='tags' xs={5} sm={4} md={5} lg={5} xl={2}>
                <p>
                  <Link style={{ color: 'white' }} to='/service'>
                    Service
                  </Link>
                </p>
              </Col>
            </div>
          </Col>
          <Col xs={1} sm={2} md={2} lg={1} xl={3} className='col col__cart'>
            <Link to={`/cart/${decodedToken?.id}`}>
              <div className='col__cart'>
                <ShoppingCartOutlined style={{ color: 'white' }} shape='square' className='col__cart__icon' />

                <div className='col__cart__container'>
                  <h4 className='col__cart__text'>Cart</h4>
                  <div className='col__cart__inline'>
                    <h4 className='col__cart__text1'>Products</h4>
                  </div>
                </div>
              </div>
            </Link>
          </Col>

          <Col xs={3} sm={3} md={3} lg={3} xl={3} className='col col__cart'>
            <div className='col__cart'>
              <UserOutlined style={{ color: 'white' }} shape='square' className='col__cart__icon' />
              <div className='col__cart__container1'>
                {decodedToken && decodedToken.role ? (
                  <>
                    <h4 className='col__cart__text name' style={{ paddingBottom: '40px' }}>
                      {decodedToken.name}
                    </h4>

                    <h4
                      className='col__cart__text'
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        localStorage.clear()
                        navigate('/sign-in')
                      }}
                    >
                      Log out
                    </h4>
                  </>
                ) : (
                  <>
                    <h4 style={{ paddingBottom: '10px' }}>
                      <Link className='col__cart__text' to='/sign-up'>
                        Đăng ký
                      </Link>
                    </h4>

                    <h4>
                      <Link className='col__cart__text' to='/sign-in'>
                        Đăng nhập
                      </Link>
                    </h4>
                  </>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </header>
  )
}

export default Header
