/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { Table, Tag, Button, Popconfirm, message, Modal, Form, Input, Layout, Menu, Breadcrumb } from 'antd'
import axios from 'axios'
import { getAccessToken } from '~/Auth/auth'
import SubMenu from 'antd/es/menu/SubMenu'
import { Link, useNavigate } from 'react-router-dom'
import {
  UserOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  LogoutOutlined,
  FundProjectionScreenOutlined
} from '@ant-design/icons'

const { Header, Content, Sider } = Layout

interface User {
  id: number
  phoneNumber: string
  name: string
  status: string
  role: {
    id: number
    nameRole: string
  }
  address: string
}

function UserTable(): JSX.Element {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [editedName, setEditedName] = useState<string>('')
  const [editedPhoneNumber, setEditedPhoneNumber] = useState<string>('')
  const [editedAddress, setEditedAddress] = useState<string>('')
  const [editedRole, setEditedRole] = useState<string>('')
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = getAccessToken()
        const response = await axios.get<User[]>('https://ecom-be-htgu.onrender.com/users', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        setUsers(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user data:', error)
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setEditedName(user.name)
    setEditedPhoneNumber(user.phoneNumber)
    setIsModalVisible(true)
    setEditedAddress(user.address) // Thêm dòng này
    setEditedRole(user.role.nameRole)
  }

  const handleDelete = async (userId: number) => {
    try {
      const accessToken = getAccessToken()
      await axios.delete(`https://ecom-be-htgu.onrender.com/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
      message.success('User deleted successfully')
    } catch (error) {
      console.error('Error deleting user:', error)
      message.error('Failed to delete user')
    }
  }

  const handleModalOk = async () => {
    try {
      const updatedUser: User = {
        ...editingUser!,
        name: editedName,
        phoneNumber: editedPhoneNumber,
        address: editedAddress, // Thêm dòng này
        role: { id: editingUser!.role.id, nameRole: editedRole }
      }

      const accessToken = getAccessToken()
      await axios.patch(`https://ecom-be-htgu.onrender.com/users/${editingUser?.id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      setUsers((prevUsers) => prevUsers.map((user) => (user.id === editingUser?.id ? updatedUser : user)))
      setIsModalVisible(false)
      message.success('User updated successfully')
    } catch (error) {
      console.error('Error updating user:', error)
      message.error('Failed to update user')
    }
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value)
  }

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPhoneNumber(event.target.value)
  }
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedAddress(event.target.value)
  }

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedRole(event.target.value)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: { nameRole: string }) => <Tag>{role.nameRole}</Tag>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={status === 'active' ? 'green' : 'red'}>{status}</Tag>
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render: (address: string) => <span>{address}</span>
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: User) => (
        <span>
          <Button type='link' onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title='Are you sure to delete this user?'
            onConfirm={() => handleDelete(record.id)}
            okText='Yes'
            cancelText='No'
          >
            <Button type='link' danger>
              Delete
            </Button>
          </Popconfirm>
        </span>
      )
    }
  ]
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
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
            <Table<User> columns={columns} dataSource={users} loading={loading} rowKey='id' />
            <Modal title='Edit User' open={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
              {editingUser && (
                <Form>
                  <Form.Item label='Name'>
                    <Input value={editedName} onChange={handleNameChange} />
                  </Form.Item>
                  <Form.Item label='Phone Number'>
                    <Input value={editedPhoneNumber} onChange={handlePhoneNumberChange} />
                  </Form.Item>
                  <Form.Item label='Address'>
                    <Input value={editedAddress} onChange={handleAddressChange} />
                  </Form.Item>
                  <Form.Item label='Role'>
                    <Input value={editedRole} onChange={handleRoleChange} />
                  </Form.Item>
                </Form>
              )}
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default UserTable
