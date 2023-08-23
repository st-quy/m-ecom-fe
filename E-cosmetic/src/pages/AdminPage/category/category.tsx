import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import axios from 'axios'

interface Category {
  id: number
  name: string
  description: string
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    // Gọi API và cập nhật dữ liệu vào biến categories
    axios.get('https://ecom-be-htgu.onrender.com/products/categoryId=1 ')
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error: any) => {
        console.error('Lỗi khi gọi API:', error)
      })
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    }
  ]

  return <Table dataSource={categories} columns={columns} />
}

export default Category