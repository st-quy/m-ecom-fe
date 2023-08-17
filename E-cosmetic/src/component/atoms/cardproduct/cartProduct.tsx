import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Space, Pagination,Spin } from 'antd';
import axios from 'axios';

import { Link } from 'react-router-dom';

interface Product {
  id: number;
  image: string;
  product_name: string;
  price: number;
  description: string;
  quantity_sold:number;
}

interface CardProductProps {
  searchValue?: string;
  sortByPrice?: string;
  sortByQuantitySold?:string;
  categoryId?: string;
}

const CardProduct: React.FC<CardProductProps> = ({ searchValue, sortByPrice,sortByQuantitySold,categoryId }: CardProductProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const itemsPerPage = 12;
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        let url = 'https://ecom-be-htgu.onrender.com/products';

        if (searchValue) {
          url += `?productName=${searchValue}`;
        } else if (sortByPrice) {
          url += `?sortByPrice=${sortByPrice}`;
        }else if (sortByQuantitySold){
          url += `?sortByQuantitySold=${sortByQuantitySold}`;
        }
        else if (categoryId) { 
          url += `?categoryId=${categoryId}`;
        }

        const response = await axios.get(url);

        setProducts(response.data);
        setTotalItems(response.data.length);
        setCurrentPage(1);
        setError('');
        console.log(url);

      } catch (error) {
        console.error('Error fetching products:', error);
        
        setError('Error fetching products');
      }

      setIsLoading(false);
    };

    fetchData();
  }, [searchValue, sortByPrice,sortByQuantitySold,categoryId]);
  

  const renderCols = () => {
    if (isLoading) {
      return  <p style={{  marginLeft:"50%",marginTop:"10%"  }} > <Spin  style={{color:"#7eaa92"}}className="custom-spin" tip="Loading" size="large">
        <div   className="content"  />
      </Spin>;</p>
    }

    if (error) {
      return <p style={{ color: 'red' }}>{error}</p>;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const cols = products
      .slice(startIndex, endIndex)
      .map((product) => (
        <Col className="col" sm={12} md={12} lg={8}  xl={6}  key={product.id}>
          <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Link to={`/products/${product.product_name}/${product.id}`}>
            <Card size="small" className="product-card">
              <img className="productimg" src={product.image} alt="" style={{ width: '100%' }} />
              <p className="productname">{product.product_name}</p>
              <p className="productprice">{product.price},00 USD</p>
              <p className="productdescription">{product.description}</p>
              <p className="productsold">đã bán {product.quantity_sold}</p>
            </Card>
            </Link>
          </Space>
        </Col>
      ));

    return cols;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleQuickJumper = (page: number) => {
    if (page >= 1 && page <= Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <Row gutter={[50, 12]}>{renderCols()}</Row>
      {totalItems > 0 && (
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={totalItems}
          onChange={handlePageChange}
          showSizeChanger={false}
          showQuickJumper={true}
          onShowSizeChange={handleQuickJumper}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
        />
      )}
    </div>
  );
};

export default CardProduct;