/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col, Statistic } from 'antd'
import {
  AppstoreOutlined,
  UserOutlined,
  AuditOutlined,
  FileOutlined,
  BarsOutlined,
  DollarOutlined
} from '@ant-design/icons'

const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

interface MenuItem {
  key: string
  title: string
  icon: React.ReactNode
  path: string
  submenu?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    icon: <AppstoreOutlined />,
    path: '/dashboard',
    submenu: [
      {
        key: 'users',
        title: 'Users',
        icon: <UserOutlined />,
        path: '/users'
      },
      {
        key: 'categories',
        title: 'Categories',
        icon: <FileOutlined />,
        path: '/categories'
      }
    ]
  },
  {
    key: 'management',
    title: 'Management',
    icon: <AuditOutlined />,
    path: '/management',
    submenu: [
      {
        key: 'product',
        title: 'Product',
        icon: <BarsOutlined />,
        path: '/product'
      }
    ]
  }
]

const Dashboard: React.FC = () => {
  const [selectedKeys] = useState<string[]>(['dashboard', 'users'])
  const [openKeys, setOpenKeys] = useState<string[]>([])

  const handleMenuOpenChange = (keys: string[]) => {
    setOpenKeys(keys)
  }

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#C8E4B2' }}>
      <Header className="header_admin">
        <div className="logo"/>
      </Header>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          collapsedWidth={80}
          style={{ backgroundColor: '#C8E4B2' }}
        >
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={handleMenuOpenChange}
            style={{ height: '100%', borderRight: 0 }}
          >
            {menuItems.map((menuItem) => {
              if (menuItem.submenu) {
                return (
                  <SubMenu key={menuItem.key} title={menuItem.title} icon={menuItem.icon}>
                    {menuItem.submenu.map((subMenuItem) => (
                      <Menu.Item key={subMenuItem.key}>{subMenuItem.title}</Menu.Item>
                    ))}
                  </SubMenu>
                )
              }
              return (
                <Menu.Item key={menuItem.key} icon={menuItem.icon}>
                  {menuItem.title}
                </Menu.Item>
              )
            })}
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {selectedKeys.map((key) => {
              const menuItem = menuItems.find((item) => item.key === key)
              if (menuItem) {
                return (
                  <Breadcrumb.Item key={menuItem.key}>
                    {menuItem.title}
                  </Breadcrumb.Item>
                )
              }
              return null
            })}
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}>
            <div className='dasdboard_admin'>
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic title="User" value={42344} 
                  prefix={<UserOutlined />}
                  style={{
                    color: "purple",
                    backgroundColor: "rgb(242, 238, 157)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}/>
                </Col>
                <Col span={8}>
                  <Statistic title="Product" value={112893} precision={2} 
                  prefix={<BarsOutlined />}
                  style={{
                    color: "blue",
                    backgroundColor: "rgba(173, 216, 230, 0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}/>
                </Col>
                <Col span={8}>
                  <Statistic title="Bill" value={112893} precision={2} 
                  prefix={<DollarOutlined 
                    style={{
                      color: "red",
                      backgroundColor: "rgba(255, 0, 0, 0.25)",
                      borderRadius: 20,
                      fontSize: 24,
                      padding: 8,
                    }}/>}
                  style={{
                    color: "green",
                    backgroundColor: "rgba(0, 255, 0, 0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                  />
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Dashboard