import { Link, useParams } from 'react-router-dom';
import { Breadcrumb } from 'antd';

export default function BreadcrumbComponent() {
  const { product_name, id } = useParams();

  const breadcrumbs = [
    {
      title: 'HomePage',
      link: '/',
    },
    {
      title: product_name,
      link: `/products/${product_name}/${id}`,
    },
  ];

  return (
    <Breadcrumb style={{ marginTop: "3%", marginLeft: "7.5%" }} items={breadcrumbs}>
      {breadcrumbs.map((breadcrumb, index) => (
        <Breadcrumb.Item key={index}>
          <Link to={breadcrumb.link}>
            <b style={{ color: "#8CAE71" }}>{breadcrumb.title}</b>
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}