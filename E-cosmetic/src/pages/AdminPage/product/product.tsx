import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import axios from 'axios'
import 'antd/dist/reset.css'
import './_product.scss'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Gọi API và cập nhật dữ liệu vào biến products
    axios
      .get('https://ecom-be-htgu.onrender.com/products')
      .then(response => {
        setProducts(response.data)
      })
      .catch(error => {
        console.error('Lỗi khi gọi API:', error)
      })
  }, [])

  const columns = [
    {
      title: <div className='centered-title'>ID</div>,
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: <div className="centered-title">Product_name</div>,
      dataIndex: 'product_name',
      key: 'product_name'
    },
    {
      title: <div className="centered-title">Description</div>,
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: <div className="centered-title">Price</div>,
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: <div className="centered-title">Image</div>,
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => <img src={image} alt="Product" style={{ width: '50px' }} />
    }
  ]

  return <Table className="product-table" dataSource={products} columns={columns} />
}

export default ProductTable;