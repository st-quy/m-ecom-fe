import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";

import { Col, Row } from "antd";
import Slider from "~/component/atoms/slider/slider";
const Header: React.FC = () => {
  return (
    <header>
 
  
             
      <Row className="header">
        <Col className="col col__image"   xs={5} sm={4} md={5}  lg={5} xl={5}>
          <img
            className="col_image__logo"
            src="https://tse1.mm.bing.net/th?id=OIP.L-l2fNc0dJjaZCPyg3sIcQHaFR&pid=Api&P=0&h=180"
            alt="Logo"
          />
        </Col>

        <Col xs={3} sm={3} md={3} lg={3} xl={3} className="col">
          <div className="col__home">
            <b>Home</b>
          </div>
        </Col>
        <Col xs={3} sm={3} md={3}  lg={3} xl={3} className="col">
          <div className="col__service">
            <b>Service</b>
          </div>
        </Col>

        <Col xs={3}  sm={3} md={3}  lg={3} xl={3} className="col">
          <div className="col__about">
            <b>About</b>
          </div>
        </Col>
        <Col xs={4} sm={3} md={3}  lg={3} xl={5} className="col">
          <div className="col__contact">
            <b>Contact</b>
          </div>
        </Col>

        <Col xs={1} sm={2} md={2}  lg={1} xl={1} className="col col__cart">
          <div className="col__cart">
            <ShoppingCartOutlined className="col__cart__icon" />
            <h5 className="col__cart__text">Cart</h5>
          </div>
        </Col>
        <Col xs={5} sm={2} md={1}  lg={1} xl={1}></Col>
        <Col xs={18}  sm={0} md={0}  lg={0} xl={0}></Col>
        <Col xs={1} sm={2} md={2}  lg={2} xl={2} className="col col__login">
          <button className="col__login__buton">Login</button>
        </Col>
    
        
      </Row>
  
      <Slider />

    </header>
  );
};

export default Header;
