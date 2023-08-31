/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, message, Popconfirm, Spin, Layout, Menu, Breadcrumb } from 'antd'
import axios from 'axios'
import {
  UserOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  LogoutOutlined,
  FundProjectionScreenOutlined
} from '@ant-design/icons'
import SubMenu from 'antd/es/menu/SubMenu'
import { Link, useNavigate } from 'react-router-dom'

const { Header, Content, Sider } = Layout
interface Category {
  id: number
  category_name: string
  delete_at: string | null
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [addForm] = Form.useForm()
  const [loading, setLoading] = useState(true) // Added loading state
  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const navigate = useNavigate()

  useEffect(() => {
    // Gọi API và cập nhật dữ liệu vào biến categories
    fetchCategories()
  }, [])

  const fetchCategories = () => {
    axios
      .get('https://ecom-be-htgu.onrender.com/category')
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error: any) => {
        console.error('Lỗi khi gọi API:', error)
      })
      .finally(() => {
        setLoading(false) // Set loading state to false after fetching products
      })
  }

  const handleAction = (category: Category) => {
    setEditingCategory(category)
    setIsModalVisible(true)
  }

  const handleUpdate = () => {
    const updatedCategory = addForm.getFieldsValue()
    updateCategory(updatedCategory)
  }

  const updateCategory = (category: Category) => {
    axios
      .put(`https://ecom-be-htgu.onrender.com/category/${category.id}`, category)
      .then((response) => {
        message.success('Cập nhật category thành công')
        setIsModalVisible(false)
        fetchCategories()
      })
      .catch((error: any) => {
        console.error('Lỗi khi cập nhật category:', error)
      })
  }

  const handleDelete = (categoryId: number) => {
    deleteCategory(categoryId)
  }

  const deleteCategory = (categoryId: number) => {
    axios
      .delete(`https://ecom-be-htgu.onrender.com/category/${categoryId}`)
      .then((response) => {
        message.success('Xóa category thành công')
        fetchCategories()
      })
      .catch((error: any) => {
        console.error('Lỗi khi xóa category:', error)
      })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Category_name',
      dataIndex: 'category_name',
      key: 'category_name'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Category) => (
        <span>
          <Button type='link' size='small' onClick={() => handleAction(record)}>
            Edit
          </Button>
          <Popconfirm
            title='Bạn có chắc chắn muốn xóa danh mục này?'
            onConfirm={() => handleDelete(record.id)}
            okText='Đồng ý'
            cancelText='Hủy'
          >
            <Button type='link' danger size='small'>
              Delete
            </Button>
          </Popconfirm>
        </span>
      )
    }
  ]

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#C8E4B2' }}>
      <Layout>
        <Sider
          width={200}
          className='site-layout-background'
          collapsedWidth={80}
          style={{ backgroundColor: '#C8E4B2' }}
          collapsed={collapsed}
          onCollapse={toggleCollapsed}
        >
          <Menu mode='inline' selectedKeys={[location.pathname]} style={{ height: '100%', borderRight: 0 }}>
            <SubMenu
              key='/admin'
              title={
                <span>
                  <HomeOutlined /> Admin
                </span>
              }
            >
              <Menu.Item key='/dashboard'>
                <Link to='/dashboard'>
                  <HomeOutlined /> Dashboard
                </Link>
              </Menu.Item>
              <Menu.Item key='/product'>
                <Link to='/product'>
                  <ShoppingOutlined /> Products
                </Link>
              </Menu.Item>
              <Menu.Item key='/category'>
                <Link to='/category'>
                  <AppstoreOutlined /> Categories
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key='/user'>
              <Link to='/user'>
                <UserOutlined /> Users
              </Link>
            </Menu.Item>
            <Menu.Item key='/homepage'>
              <Link to='/'>
                <FundProjectionScreenOutlined /> Preview Shop
              </Link>
            </Menu.Item>
            <Menu.Item
              key='/logout'
              onClick={() => {
                localStorage.clear()
                navigate('/sign-in')
              }}
            >
              <LogoutOutlined />
              Log out
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0', marginTop: '30px' }}>
            {location.pathname.split('/').map((path, index) => (
              <Breadcrumb.Item key={index}>
                <Link to={path}>{path}</Link>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <Content className='site-layout-background' style={{ margin: 0, minHeight: 280 }}>
            <div className='app'>
              {loading ? (
                <div style={{ marginTop: '20%', marginLeft: '50%', color: 'green' }}>
                  <Spin size='large' />
                  Loading....
                </div>
              ) : (
                <div>
                  <Table dataSource={categories} columns={columns} />

                  <Modal
                    title='Chỉnh sửa danh mục'
                    open={isModalVisible}
                    onOk={handleUpdate}
                    onCancel={() => setIsModalVisible(false)}
                  >
                    <Form form={addForm} initialValues={editingCategory || {}}>
                      <Form.Item name='category_name' label='Tên danh mục' rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                    </Form>
                  </Modal>
                </div>
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Category
