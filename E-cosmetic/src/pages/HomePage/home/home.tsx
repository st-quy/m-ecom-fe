import React from "react";
import { Col, Row } from "antd";

import { SearchOutlined  } from '@ant-design/icons';
import CardProduct from "~/component/atoms/cardproduct/cartProduct";



const Home: React.FC = () => {
  return (
    <div className="container">

   
    <Row gutter={[30,0]}>
    
      <Col className="col" sm={12} md={9} lg={12} xl={12}>
        <form action="" id="search" >
        <label  className="search-label search-name">

          <input
            type="text"
            id="searchInput"
            placeholder="Researching everything ........"
            style={{ width:"100%" }}
          />
          <button id="search-btn"><SearchOutlined /></button>
          </label>
        </form>
      </Col>
      <Col className="col" sm={12} md={5} lg={4} xl={4}>
     <div className="form-group">
  <label className="search-label search-price">
  </label>
   
  
  <select className="select">
    <option value="default">Default</option>
    <option value="lowToHigh">Low to High</option>
    <option value="highToLow">High to Low</option>
  </select>

</div>
      </Col>
      <Col className="col" sm={12} md={5} lg={4} xl={4}>
        <div className="form-group">
          <label  className="search-label search-amountsold">
          
          </label>
          <select  className="select">
            <option value="default">Default</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
      
        </div>
      </Col>
      <Col className="col" sm={12} md={5} lg={4} xl={4}>
        <div className="form-group">
          <label  className="search-label search-categories">
          </label>
        
          <select  className="select">
            <option value="default">Default</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
    
        </div>
      </Col>

    </Row>

   <CardProduct></CardProduct>
    </div>
  );
};

export default Home;
