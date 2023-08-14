import React, { useState } from "react";
import { Row, Col, Card, Space, Pagination } from "antd";

import image from "../../../assets/image.png"

const CardProduct: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalItems = 200;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderCols = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const cols = [];
    for (let i = startIndex; i < endIndex && i < totalItems; i++) {
      cols.push(
        <Col className="col" md={12} lg={8} xl={6} key={i}>
          <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Card size="small" className="product-card">
              <img src={image} alt="" style={{ width: "100%" }} />
              <p>Card content</p>
              <p>189000 đ</p>
              <p>
                hàng thơm ngon mời bạn ăn nha tôi nay không đợi được nữa giờ tôi ăn liên
              </p>
            </Card>
          </Space>
        </Col>
      );
    }
    return cols;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleQuickJumper = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <Row gutter={[30, 16]}>{renderCols()}</Row>
      {totalPages > 1 && (
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={totalItems}
          onChange={handlePageChange}
          showSizeChanger={false}
          showQuickJumper={true}
          onShowSizeChange={handleQuickJumper}
          style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
        />
      )}
    </div>
  );
};

export default CardProduct;