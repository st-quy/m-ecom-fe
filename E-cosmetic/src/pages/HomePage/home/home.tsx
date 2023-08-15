import React from "react";
import { Col, Row } from "antd";

import CardProduct from "~/component/atoms/cardproduct/cartProduct";

import SelectComponent from "~/component/atoms/select/selectarange";
import InputComponet from "~/component/atoms/input/input";

const Home: React.FC = () => {
  return (
    <div className="container">

   
    <Row gutter={[30,0]}>
    
      <Col className="col" sm={12} md={9} lg={12} xl={12}>
        <label  className="search-label search-name">
        </label>
       <InputComponet/>
      </Col>
      <Col className="col" sm={12} md={5} lg={4} xl={4}>
     <div className="form-group">
  <label className="search-label search-price">
  </label>
   
  
  <SelectComponent name="selectPrice" />


</div>
      </Col>
      <Col className="col" sm={12} md={5} lg={4} xl={4}>
        <div className="form-group">
          <label  className="search-label search-amountsold">
          
          </label>
          <SelectComponent name="selectAmountSold" />

      
        </div>
      </Col>
      <Col className="col" sm={12} md={5} lg={4} xl={4}>
        <div className="form-group">
          <label  className="search-label search-categories">
          </label>
        
          <SelectComponent name="selectCategories" />

    
        </div>
      </Col>

    </Row>

   <CardProduct></CardProduct>
    </div>
  );
};

export default Home;
