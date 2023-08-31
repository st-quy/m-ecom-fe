import React, { useEffect ,useState } from 'react';

import { Col, Row } from 'antd';
import Slider from '~/component/atoms/slider/slider';
import CardProduct from '~/component/atoms/cardproduct/cartProduct';
import SelectCategories from '~/component/atoms/select/selectCategories';
import SelectComponent from '~/component/atoms/select/selectarange';
import InputComponent from '~/component/atoms/input/input';
const Home: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [sortByPrice, setSortByPrice] = useState('');
  const [sortByQuantitySold, setSortByQuantitySold] = useState('');
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

  
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleSortChange = (value: string) => {
    setSortByPrice(value);
  };

  const handleSortSoldChange = (value: string) => {
    setSortByQuantitySold(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
  };
  
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const accessToken = searchParams.get("accessToken");
  
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      window.location.href = ('/homepage')
    }
  }, []);
  
    
    
    
  return (
    <>
    <Slider />

    <div className="container">
      <Row gutter={[30, 0]}>
        <Col className="col" sm={12} md={9} lg={12} xl={12}>
          <label className="search-label search-name"></label>
          <InputComponent onSearch={handleSearch} />
        </Col>
        <Col className="col" sm={12} md={5} lg={4} xl={4}>
          <div className="form-group">
            <label className="search-label search-price"></label>
            <SelectComponent name="sortx" onChange={handleSortChange} />
            </div>
        </Col>
        <Col className="col" sm={12} md={5} lg={4} xl={4}>
          <div className="form-group">
            <label className="search-label search-amountsold"></label>
            <SelectComponent name="sorta" onChange={handleSortSoldChange} />
          </div>
        </Col>
        <Col className="col" sm={12} md={5} lg={4} xl={4}>
          <div className="form-group">
            <label className="search-label search-categories"></label>
            <SelectCategories  name="sortc" onChange={handleCategoryChange} />
          </div>
        </Col>
      </Row>
      <CardProduct
        searchValue={searchValue}
        sortByPrice={sortByPrice}
        sortByQuantitySold={sortByQuantitySold}
        categoryId={categoryId}
    isDetailPage={false} 

      />
    </div>
    </>
  );
};

export default Home;