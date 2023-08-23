import { Button, Space, Descriptions, InputNumber } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import CardProduct from '~/component/atoms/cardproduct/cartProduct';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
interface Item {
  key: string;
  label: string;
  children: string | number;
}

const Detail: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  

  useEffect(() => {
    // Gửi yêu cầu API và nhận dữ liệu về
    axios
      .get(`https://ecom-be-htgu.onrender.com/products/${id}`)
      .then(response => {
        // Chuyển đổi dữ liệu từ API thành mảng items
        const transformedData: Item[] = [
          
          {
            key: '1',
            label: 'Status',
            children: response.data.status,
          },
          
          {
            key: '2',
            label: 'Sold Amount',
            children: response.data.quantity_sold,
          },
          {
            key: '3',
            label: 'Price',
            children: '$' + response.data.price,
          },
          {
            key: '4',
            label: 'Description',
            children: response.data.description,
    
          },
          {
            key: '5',
            label: 'Category',
            children: response.data.category.category_name,
          },
          {
            key: '6',
            label: 'Brand',
            children: response.data.brand,
          },   
        ];

        // Cập nhật mảng items với dữ liệu đã chuyển đổi
        setItems(transformedData);
        setTitle(response.data.product_name);
        setImage(response.data.image);


      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  const filteredStatus = items.filter(item => ['1', '2'].includes(item.key));
  const filterDescription = items.filter(item => ['3', '4', '5', '6'].includes(item.key));
  return (
    <>
      <Space size={20} style={{ marginLeft: "7.5%", marginRight: "7.5%", marginTop: "40px" }}>
        <div className="left">
    
        <img src={image}  style={{ width: "300px", height: "400px", backgroundBlendMode: "darken" }}></img>
        </div>
        <div className="right">
          <Descriptions
            title={title}
            labelStyle={{ fontWeight: 'bold', color: "#000" }}
            items={filteredStatus}
            column={{ xxl: 2, xl: 7, lg: 1, md: 1, sm: 1, xs: 1 }}
          />
          <Descriptions
            labelStyle={{ fontWeight: 'bold', color: "#000"}}
        
            items={filterDescription}
            column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          />

          <div>
            <Space size={30}>
              <Button style={{ background: "#8CAE71" }}>
                Size M
              </Button>
              <Button style={{ background: "#8CAE71" }}>
                Size S
              </Button>
              <Button style={{ background: "#8CAE71" }}>
                Size X
              </Button>
            </Space>
          </div>

          <div>
            <Space style={{ marginTop: "20px" }}>
              <InputNumber style={{ background: "#8CAE71" }} min={1} max={10} defaultValue={3} />
              <Button style={{ background: "#8CAE71", width: "170px" }}>Add to Cart <ShoppingCartOutlined style={{ fontSize: "1.5em" }} /></Button>
            </Space>
          </div>

          <div>
            <Button
              type="primary"
              style={{ color:"#000" ,marginTop: "20px", width: "267px", height: "40px", background: "linear-gradient(180deg, #C8E4B2 0%, #9ED2BE 48.96%, #7EAA92 100%)" }}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </Space>
      <div style={{ marginLeft: "7.5%", marginRight: "7.5%", marginTop: "100px" }}>
      <b style={{ color: "#8CAE71",fontSize:"1.5em" }}>Some Another Product:</b>
      <div >
      <CardProduct  isDetailPage={true} />
      </div>
      </div>
    </>
  );
};

export default Detail;