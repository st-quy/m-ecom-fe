import React, { useEffect, useState } from 'react';
import { Table, Image,Space } from 'antd';
import axios from 'axios';

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get<Cart[]>('https://ecom-be-htgu.onrender.com/carts/1');
        const cartData = response.data[0];
        setCart(cartData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const columns = [
 
    {
      title: 'Image',
      dataIndex: 'product',
      key: 'image',
      render: (product: Product) => (
        <>
          <Image src={product.image} alt={product.product_name} width={80} />
        </>
      ),
    },
    {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
        render:
        (product: Product) => (
            <>
            <Space direction="vertical" size={20} >
              <span><b>{product.product_name}</b></span>
              <span><b>SKU: {product.sku}</b></span>
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
      render: (quantity: number) => <span>{quantity}</span>,
    },
    {
        title: 'Total Price',
        dataIndex: 'total_price',
        key: 'total_price',
        render: (totalPrice: number) => <span>{totalPrice}</span>,
      },
  ];

  const dataSource = cart?.cartsProduct.map((item) => ({
    key: item.cartId,
    product: item.product,
    price: item.product.price,
    quantity: item.quantity,
    description: item.product.description,
    total_price: cart.total_price, // Thêm total_price vào dataSource cho cột "Total Price"
  })) || [];

  return (
    <div>
      {loading ? (
        <p>Loading cart...</p>
      ) : (
        <>
          <Table columns={columns} dataSource={dataSource} />
        </>
      )}
    </div>
  );
};

export default CartTable; 