import React from "react";
import { Col, Row } from "antd";
import "./home.scss";
import { SearchOutlined  } from '@ant-design/icons';
import CartProduct from "../items/CardProduct";
import image1 from '../assets/image1.jpg';

const Home: React.FC = () => {
  return (
    <div className="container">

   
    <Row gutter={[30, 16]}>
    
      <Col className="col" sm={4} md={5} xl={6}>
        <form action="" id="search" >
        <label  className="search-label search-name">

          <input
            type="text"
            id="searchInput"
            placeholder="Researching everything ........"
          />
          <button id="search-btn"><SearchOutlined /></button>
          </label>
        </form>
      </Col>
      <Col className="col" sm={4} md={5} xl={5}>
     <div className="form-group">
  <label className="search-label search-price">
   
  
  <select>
    <option value="default">Default</option>
    <option value="lowToHigh">Low to High</option>
    <option value="highToLow">High to Low</option>
  </select>
  </label>
</div>
      </Col>
      <Col className="col" sm={4} md={5} xl={5}>
        <div className="form-group">
          <label  className="search-label search-amountsold">
          
        
          <select>
            <option value="default">Default</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
          </label>
        </div>
      </Col>
      <Col className="col" sm={4} md={5} xl={5}>
        <div className="form-group">
          <label  className="search-label search-categories">
      
        
          <select>
            <option value="default">Default</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
          </label>
        </div>
      </Col>
      <Col sm={8} md={4} xl={3} />
    </Row>

   <CartProduct></CartProduct>
    </div>
  );
};

export default Home;
