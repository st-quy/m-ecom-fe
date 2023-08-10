import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./header.scss";

import { Col, Row } from "antd";
import Slider from "../slider/slider";

const Header: React.FC = () => {
  return (
    <header>
      <Row className="row">
        <Col className="col col__image" sm={4} md={5} xl={5}>
          <img
            className="col_image__logo"
            src="https://tse1.mm.bing.net/th?id=OIP.L-l2fNc0dJjaZCPyg3sIcQHaFR&pid=Api&P=0&h=180"
            alt="Logo"
          />
        </Col>

        <Col sm={3} md={3} xl={3} className="col">
          <div className="col__home">
            <b>Home</b>
          </div>
        </Col>
        <Col sm={3} md={3} xl={3} className="col">
          <div className="col__service">
            <b>Service</b>
          </div>
        </Col>

        <Col sm={3} md={3} xl={3} className="col">
          <div className="col__about">
            <b>About</b>
          </div>
        </Col>
        <Col sm={3} md={4} xl={5} className="col">
          <div className="col__contact">
            <b>Contact</b>
          </div>
        </Col>

        <Col sm={2} md={1} xl={1} className="col col__cart">
          <div className="col__cart">
            <ShoppingCartOutlined className="col__cart__icon" />
            <h5 className="col__cart__text">Cart</h5>
          </div>
        </Col>
        <Col sm={2} md={2} xl={1}></Col>
        <Col sm={2} md={2} xl={2} className="col col__login">
          <button className="col__login__buton">Login</button>
        </Col>
      </Row>

      <Slider />
    </header>
  );
};

export default Header;
