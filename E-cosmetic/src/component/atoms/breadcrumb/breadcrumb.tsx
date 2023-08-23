import { Link, useParams } from 'react-router-dom';
import { Breadcrumb } from 'antd';

export default function BreadcrumbComponent() {
  const { product_name, id } = useParams();

  return (
    <Breadcrumb style={{ marginTop: "3%",marginLeft:"7.5%" }}>
      <Breadcrumb.Item>
        <Link to="/">
          <b style={{ color: "#8CAE71" }}>HomePage</b>
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to={`/products/${product_name}/${id}`}>
          <b style={{ color: "#8CAE71" }}>{product_name}</b>
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to={`/products`}>
          <b style={{ color: "#8CAE71" }}>Products</b>
        </Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}