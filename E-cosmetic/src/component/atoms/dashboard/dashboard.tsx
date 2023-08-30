
import { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Statistic, Avatar, Col, Row, Button } from 'antd';
import { UserOutlined, ShoppingCartOutlined, HomeOutlined, ShoppingOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Link, useLocation, Routes, Route } from 'react-router-dom';
import Category from '~/pages/AdminPage/category/category';
import ProductTable from '~/pages/AdminPage/product/product';
import User from '~/pages/AdminPage/user/user';
import SubMenu from 'antd/es/menu/SubMenu';

import UserTable from '~/pages/AdminPage/user/user';
const { Header, Content, Sider } = Layout;
export const AdminRoutes = () => (
  <Routes>
    <Route path="/product" element={<ProductTable />} />
    <Route path="/category" element={<Category />} />
    <Route path="/user" element={<UserTable />} />
  </Routes>
);
const Dashboard = () => {
  const location = useLocation();
  const [productCount, setProductCount] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // lấy API show product count
    const fetchData = async () => {
      try {
        const response = await fetch('https://ecom-be-htgu.onrender.com/products');
        const data = await response.json();
        const count = data.length;    // Lấy giá trị từ API 
        setProductCount(count);  // Cập nhật giá trị số lượng sản phẩm
      } catch (error) {
        console.error('Error fetching product data:', error);
      };
      // Thực hiện yêu cầu HTTP để lấy dữ liệu từ API
      fetch('https://ecom-be-htgu.onrender.com/checkout')
        .then(response => response.json())
        .then(data => {
          // Lấy dữ liệu cần thiết từ kết quả API (ví dụ: orderCount)
          const { orderCount } = data;
          setOrderCount(orderCount);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      // Thực hiện yêu cầu HTTP để lấy dữ liệu từ API
      fetch('https://ecom-be-htgu.onrender.com/users')
        .then(response => response.json())
        .then(data => {
          // Lấy dữ liệu cần thiết từ kết quả API (ví dụ: userCount)
          const { userCount } = data;
          setUserCount(userCount);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
    fetchData();
  }, []);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#C8E4B2' }}>
      <Header className="header_admin" style={{ backgroundColor: '#C8E4B2' }}>
        <Col className='col col__image' xs={5} sm={4} md={5} lg={5} xl={6} style={{ margin: '0' }}>
          <Link to="/">
            <img
              className='col_image__logo'
              src='../../../../src/assets/955c7c5dc1a345e0a839c0d9f20cf96b.png'
              alt='Logo'
              style={{ width: '50px', height: '50px' }}
            />
          </Link>
        </Col>
      </Header>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          collapsedWidth={80}
          style={{ backgroundColor: '#C8E4B2', marginTop: '20px' }}
          collapsed={collapsed}
          onCollapse={toggleCollapsed}
        >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{ height: '100%', borderRight: 0 }}
          >

            <SubMenu
              key="/dashboard"
              title={
                <span>
                  <Link to="/dashboard"><HomeOutlined /> Dashboard </Link>
                </span>
              }
            >
              <Menu.Item key="/product">
                <Link to="/product"><ShoppingOutlined /> Products</Link>
              </Menu.Item>
              <Menu.Item key="/category">
                <Link to="/category"><AppstoreOutlined /> Categories</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="/user">
              <Link to="/user"><UserOutlined /> Users</Link>

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
          <Content className="site-layout-background" style={{ padding: 10, margin: 0, minHeight: 280, }}>
            <Routes>

              <Route path="/dashboard" element={
                <div>
                  <Row gutter={100}>
                    <Col span={8}>
                      <Button style={{ width: "100%", height: "100%", backgroundColor: '#c5f4d' }}>
                        <Statistic
                          title={<span style={{ fontWeight: 'bold' }}>Users</span>}
                          value={userCount}
                          prefix={<Avatar icon={<UserOutlined />} />}
                        />
                      </Button>
                    </Col>

                    <Col span={8}>
                      <Button style={{ width: "100%", height: "100%", backgroundColor: '#F4EEEE' }}>
                        <Statistic
                          title={<span style={{ fontWeight: 'bold' }}>Products</span>}
                          value={productCount}
                        />
                      </Button>
                    </Col>
                    <Col span={8}>
                      <Button style={{ width: "100%", height: "100%", backgroundColor: '#Fad8b9' }}>
                        <Statistic
                          title={<span style={{ fontWeight: 'bold' }}>Orders</span>}
                          value={orderCount}
                          prefix={<Avatar icon={<ShoppingCartOutlined />} />}
                        />
                      </Button>
                    </Col>
                  </Row>
                </div>
              } />
             
              <Route path="/" element={<h1>Welcome to Dashboard</h1>} />
              <Route path="*" element={<AdminRoutes />} />
             

            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;