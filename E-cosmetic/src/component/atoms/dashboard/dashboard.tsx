import { Layout, Menu, Breadcrumb} from 'antd';
import { Link, useLocation, Routes, Route } from 'react-router-dom';
import Category from '~/pages/AdminPage/category/category';
import ProductTable from '~/pages/AdminPage/product/product';
const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#C8E4B2' }}>
      <Header className="header_admin">
        <div className="logo" />
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
            selectedKeys={[location.pathname]}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="/">
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="/product">
              <Link to="/product">Product</Link>
            </Menu.Item>
            <Menu.Item key="/category">
              <Link to="/category">category</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {location.pathname.split('/').map((path, index) => (
              <Breadcrumb.Item key={index}>
                <Link to={path}>{path}</Link>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280 }}>
            <Routes>
              <Route path="/" element={<h1>Welcome to Dashboard</h1>} />
              <Route path="/product" element={<ProductTable />} />
              <Route path="/category" element={<Category />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;