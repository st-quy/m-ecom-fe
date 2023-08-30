import { Button, Space, Descriptions, InputNumber } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import CardProduct from '~/component/atoms/cardproduct/cartProduct';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAccessToken } from '~/Auth/auth';
import { useTokenDecoding } from '~/helpers/api';

interface Item {
  key: string;
  label: string;
  children: string | number;
}

const Detail: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const accessToken = getAccessToken();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [accessTokenx, decodedToken] = useTokenDecoding();

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

  const addCart = async (productId: string) => {
    try {
      const response = await axios.post(
        `https://ecom-be-htgu.onrender.com/carts/userId/${decodedToken?.id}/productId/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log('Product added to cart:', response.data);
      // Thực hiện các hành động cần thiết sau khi thêm sản phẩm vào giỏ hàng, ví dụ: hiển thị thông báo, cập nhật số lượng sản phẩm trong giỏ hàng, vv.
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi, vv.
    }
  };

  return (
    <>
      <Space size={20} style={{ marginLeft: "7.5%", marginRight: "7.5%", marginTop: "40px" }}>
        <div className="left">
          <img src={image} style={{ width: "300px", height: "400px", backgroundBlendMode: "darken" }}></img>
        </div>
        <div className="right">
          <Descriptions
            title={title}
            labelStyle={{ fontWeight: 'bold', color: "#000" }}
            items={filteredStatus}
            column={{ xxl: 2, xl: 7, lg: 1, md: 1, sm: 1, xs: 1 }}
          />
          <Descriptions
            labelStyle={{ fontWeight: 'bold', color: "#000" }}
            items={filterDescription}
            column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          />

          <div>
            <Space style={{ marginTop: "20px" }}>
            <Button
  style={{ background: "#8CAE71", width: "170px" }}
  onClick={() => id && addCart(id)}
>
  Add to Cart <ShoppingCartOutlined style={{ fontSize: "1.5em" }} />
</Button>
            </Space>
          </div>

          <div></div>
        </div>
      </Space>
      <div style={{ marginLeft: "7.5%", marginRight: "7.5%", marginTop: "100px" }}>
        <b style={{ color: "#8CAE71", fontSize: "1.5em" }}>Some Another Product:</b>
        <div>
          <CardProduct isDetailPage={true} />
        </div>
      </div>
    </>
  );
};

export default Detail;