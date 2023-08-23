import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input } from 'antd';
import axios from 'axios';

interface Product {
  id: number;
  product_name: string;
  description: string;
  price: number;
  image: string;
  brand: string;
  quantity_sold: number;
  category: {
    id: number;
    category_name: string;
  };
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [addProductModalVisible, setAddProductModalVisible] = useState(false);
  const [editProductModalVisible, setEditProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Gọi API và cập nhật dữ liệu vào biến products
    axios
      .get('https://ecom-be-htgu.onrender.com/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi gọi API:', error);
      });
  }, []);

  const handleDelete = (productId: number) => {
    // Gọi API để xóa sản phẩm
    axios
      .delete(`https://ecom-be-htgu.onrender.com/products/${productId}`)
      .then(response => {
        message.success('Xóa sản phẩm thành công');
        // Cập nhật danh sách sản phẩm sau khi xóa
        setProducts(products.filter(product => product.id !== productId));
      })
      .catch(error => {
        console.error('Lỗi khi xóa sản phẩm:', error);
        message.error('Lỗi khi xóa sản phẩm');
      });
  };

  const handleAddProduct = () => {
    setAddProductModalVisible(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditProductModalVisible(true);
  };

  const handleAddProductModalOk = () => {
    form.validateFields()
      .then(values => {
        // Gọi API để thêm sản phẩm
        axios
          .post('https://ecom-be-htgu.onrender.com/products', values)
          .then(response => {
            message.success('Thêm sản phẩm thành công');
            setProducts([...products, response.data]);
            setAddProductModalVisible(false);
            form.resetFields();
          })
          .catch(error => {
            console.error('Lỗi khi thêm sản phẩm:', error);
            message.error('Lỗi khi thêm sản phẩm');
          });
      })
      .catch(error => {
        console.error('Lỗi khi xác thực form:', error);
      });
  };

  const handleEditProductModalOk = () => {
    form.validateFields()
      .then(values => {
        // Gọi API để cập nhật sản phẩm
        axios
          .put(`https://ecom-be-htgu.onrender.com/products/${selectedProduct?.id}`, values)
          .then(response => {
            message.success('Cập nhật sản phẩm thành công');
            const updatedProducts = products.map(product => {
              if (product.id === selectedProduct?.id) {

return {
                  ...product,
                  ...values
                };
              }
              return product;
            });
            setProducts(updatedProducts);
            setEditProductModalVisible(false);
            form.resetFields();
          })
          .catch(error => {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
            message.error('Lỗi khi cập nhật sản phẩm');
          });
      })
      .catch(error => {
        console.error('Lỗi khi xác thực form:', error);
      });
  };

  const handleAddProductModalCancel = () => {
    setAddProductModalVisible(false);
    form.resetFields();
  };

  const handleEditProductModalCancel = () => {
    setEditProductModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: <div className='centered-title'>ID</div>,
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: <div className="centered-title">Product Name</div>,
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
      title: <div className="centered-title">Brand</div>,
      dataIndex: 'brand',
      key: 'brand'
    },
    {
      title: <div className="centered-title">Actions</div>,
      key: 'actions',
      render: (text: string, record: Product) => (
        <div className="centered-actions">
          <Button type="link" onClick={() => handleEditProduct(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      )
    }
  ];

  return (
    <div className="product-table">
      <div className="table-header">
        <h2>Product List</h2>
        <Button type="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      <Modal
        title="Add Product"
        visible={addProductModalVisible}
        onOk={handleAddProductModalOk}
        onCancel={handleAddProductModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"

rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="brand"
            label="Brand"
            rules={[{ required: true, message: 'Please enter brand' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Product"
        visible={editProductModalVisible}
        onOk={handleEditProductModalOk}
        onCancel={handleEditProductModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Product Name"
            initialValue={selectedProduct?.product_name}
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            initialValue={selectedProduct?.description}
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            initialValue={selectedProduct?.price}
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="brand"
            label="Brand"
            initialValue={selectedProduct?.brand}
            rules={[{ required: true, message: 'Please enter brand' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductTable;