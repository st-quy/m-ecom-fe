import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Select, Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'
interface Product {
  id: number
  product_name: string
  description: string
  price: number
  image: string
  brand: string
  quantity_sold: number
  category: {
    id: number
    category_name: string
  }
}
interface Category {
  id: number
  category_name: string
}
const AddProductForm: React.FC = () => {
  const [form] = Form.useForm()
  const [addProductModalVisible, setAddProductModalVisible] = useState(false)
  const { Option } = Select
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    axios
      .get('https://ecom-be-htgu.onrender.com/category')
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error) => {
        console.error('Error while calling API:', error)
      })
  }, [])

  // const onFinish = (values: unknown) => {
  //   // Gửi dữ liệu đến API để thêm sản phẩm
  //   axios
  //     .post('https://ecom-be-htgu.onrender.com/products', values)
  //     .then((response) => {
  //       console.log('Thêm sản phẩm thành công:', response.data)
  //       form.resetFields()
  //     })
  //     .catch((error) => {
  //       console.error('Lỗi khi thêm sản phẩm:', error)
  //     })
  // }
  const handleAddProduct = () => {
    setAddProductModalVisible(true)
  }
  const handleAddProductModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        // Gọi API để thêm sản phẩm
        axios
          .post('https://ecom-be-htgu.onrender.com/products', values)
          .then((response) => {
            message.success('Thêm sản phẩm thành công')
            setProducts([...products, response.data])
            setAddProductModalVisible(false)
            form.resetFields()
          })
          .catch((error) => {
            console.error('Lỗi khi thêm sản phẩm:', error)
            message.error('Lỗi khi thêm sản phẩm')
          })
      })
      .catch((error) => {
        console.error('Lỗi khi xác thực form:', error)
      })
  }
  const handleAddProductModalCancel = () => {
    setAddProductModalVisible(false)
    form.resetFields()
  }
  return (
    <div>
      <Button type='primary' onClick={handleAddProduct} style={{ backgroundColor: '#206609' }}>
        Add Product
      </Button>

      <Modal
        title='Add Product'
        open={addProductModalVisible}
        onOk={handleAddProductModalOk}
        onCancel={handleAddProductModalCancel}
      >
        <Form form={form} layout='vertical'>
          <Form.Item
            name='product_name'
            label='Product name'
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='description'
            label='Description'
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name='price' label='Price' rules={[{ required: true, message: 'Please enter price' }]}>
            <Input type='number' />
          </Form.Item>
          <Form.Item
            name='quantity_inventory'
            label='Quantity Inventory'
            rules={[{ required: true, message: 'Please enter quantity inventory' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name='brand' label='Brand' rules={[{ required: true, message: 'Please enter brand' }]}>
            <Input />
          </Form.Item>
          <Form.Item name='sku' label='Sku' rules={[{ required: true, message: 'Please enter SKU' }]}>
            <Input />
          </Form.Item>
          <Form.Item name='category' label='Category' rules={[{ required: true, message: 'Please select category' }]}>
            <Select>
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.category_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='image' label='image' rules={[{ required: true, message: 'Please upload image' }]}>
            <Upload>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddProductForm
