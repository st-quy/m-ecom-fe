import React, { useEffect, useState } from 'react';
import { Table, Image, Space, Button } from 'antd';
import axios from 'axios';
import { getAccessToken } from '~/Auth/auth';
import { useParams } from 'react-router-dom';

interface Cart {
  id: number;
  total_price: number;
  total_quantity: number;
  cartsProduct: CartProduct[];
}

interface CartProduct {
  cartId: number;
  quantity: number;
  product: Product;
}

interface Product {
  id: number;
  product_name: string;
  price: number;
  image: string;
  description: string;
  sku: string;
}

const CartTable: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const accessToken = getAccessToken();
  const { id } = useParams();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get<Cart[]>(`https://ecom-be-htgu.onrender.com/carts/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const cartData = response.data[0];
      setCart(cartData);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const updateQuantity = async (productId: string, operation: 'add' | 'remove') => {
    try {
      await axios.patch(
        `https://ecom-be-htgu.onrender.com/carts`,
        {
          userId:id,
          productId: productId,
          operation: operation,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      fetchCart(); 
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };
  const removeProduct = async (productId: string) => {
    try {
      await axios.delete(
        `https://ecom-be-htgu.onrender.com/carts/remove/${id}/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      fetchCart(); 
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };
  const columns = [
    {
      title: 'Image',
      dataIndex: 'product',
      key: 'image',
      render: (product: Product) => (
        <>
          <Image src={product.image} alt={product.product_name} width={120} />
        </>
      ),
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (product: Product) => (
        <>
          <Space direction="vertical" size={20}>
            <span>
              <b>{product.product_name}</b>
            </span>
            <span>
              <b>SKU: {product.sku}</b>
            </span>
          </Space>
        </>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <span>{price}</span>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number, record: CartProduct) => (
        <Space>
          <Button onClick={() => updateQuantity(record.product.id.toString(), 'remove')}>-</Button>
          <span style={{ border: '1px solid #ccc', padding: '15px 20px', borderRadius: '10px', background: '#C8E4B2' }}>
            {quantity}
          </span>
          <Button onClick={() => updateQuantity(record.product.id.toString(), 'add')}>+</Button>
        </Space>
      ),
    },

    {
      title: 'Total Price',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (totalPrice: number) => <span>${totalPrice},00</span>,
    },
    {
      title: 'Remove',
      key: 'remove',
      render: (text: any, record: CartProduct) => (
        <Button type="primary" danger onClick={() => removeProduct(record.product.id.toString())}>
          Remove
        </Button>
      )},
  ];
  const dataSource = cart?.cartsProduct.map((item) => ({
    key: item.product.id, 
    cartId: item.cartId,
    product: item.product,
    price: item.product.price,
    quantity: item.quantity,
    description: item.product.description,
    total_price: cart.total_price,
  })) || [];
  const rowClassName = () => 'custom-row';

  return (
    <div className="Cart-container">
      <>
        <Table columns={columns} dataSource={dataSource} rowClassName={rowClassName} />
      </>
    </div>
  );
};

export default CartTable;