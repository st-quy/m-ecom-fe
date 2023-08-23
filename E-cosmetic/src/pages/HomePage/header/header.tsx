import React from 'react'
import { ShoppingCartOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Col, Row, Badge } from 'antd'
import CartModel from '~/component/atoms/cartmodel/cartmodel'
const items = [
  {
    label: '1st menu item',
    key: '1'
  },
  {
    label: '2nd menu item',
    key: '2'
  },
  {
    label: '3rd menu item',
    key: '3'
  }
]
const Header: React.FC = () => {
  return (
    <header>
      <div className='header'>
        <Row className='header-row'>
          <Col className='col col__image' xs={5} sm={4} md={5} lg={5} xl={6}>
          <Link to ="/">
            <img
              className='col_image__logo'
              src='../../../../src/assets/955c7c5dc1a345e0a839c0d9f20cf96b.png'
              alt='Logo'
       
            />
                   <h2>2TBH SHOP</h2>
                   </Link>
          </Col>
          <div className='tags-navigation'>
          <Col  className='tags'  xs={5} sm={4} md={5} lg={5} xl={3}>
          <Link to ="/">

          
                   <h2>Home</h2>
                   </Link>
          </Col>
          <Col  className='tags'  xs={5} sm={4} md={5} lg={5} xl={3}>
          
          <h2>About</h2>
      </Col>
 <Col  className='tags'  xs={5} sm={4} md={5} lg={5} xl={2}>
 <Link to ="/">

          <h2>Service</h2>
          </Link>
 </Col>
 </div>
          <Col xs={4} sm={3} md={3} lg={3} xl={3} className='col col__cart'>
            <CartModel items={items}>
              <a onClick={(e) => e.preventDefault()}>
                <div className='col__cart'>
                  <Badge count={5}>
                    <HeartOutlined style={{ color: 'white' }} shape='square' className='col__cart__icon' />
                  </Badge>

                  <div className='col__cart__container'>
                    <h4 className='col__cart__text'>Favorite</h4>
                    <div className='col__cart__inline'>
                      <h4 className='col__cart__text1 no-margin'>0</h4>
                      <h4 className='col__cart__text1'>Products</h4>
                    </div>
                  </div>
                </div>
              </a>
            </CartModel>
          </Col>
          <Col xs={1} sm={2} md={2} lg={1} xl={3} className='col col__cart'>
            <CartModel items={items}>
              <a onClick={(e) => e.preventDefault()}>
                <div className='col__cart'>
                  <Badge count={5}>
                    <ShoppingCartOutlined style={{ color: 'white' }} shape='square' className='col__cart__icon' />
                  </Badge>

                  <div className='col__cart__container'>
                    <h4 className='col__cart__text'>Cart</h4>
                    <div className='col__cart__inline'>
                      <h4 className='col__cart__text1 no-margin'>0</h4>
                      <h4 className='col__cart__text1'>Products</h4>
                    </div>
                  </div>
                </div>
              </a>
            </CartModel>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3} xl={3} className='col col__cart'>
            <div className='col__cart'>
              <UserOutlined style={{ color: 'white' }} shape='square' className='col__cart__icon' />

              <div className='col__cart__container1'>
                <h4 className='col__cart__text' style={{ paddingBottom: '40px' }}>
                  WELCOME!
                </h4>

                <h4 className='col__cart__text'>User1</h4>
              </div>
            </div>
          </Col>
        </Row>
      </div>

    </header>
  )
}

export default Header;
