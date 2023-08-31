import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Select, Upload, Button,message,Table,Popconfirm} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { getAccessToken } from '~/Auth/auth'
import axios from 'axios'

interface Product {
  id: number
  product_name: string
  description: string
  price: number
  image: string
  brand: string
  quantity_inventory: number
  category: number
}
interface Category {
  id: number;
  category_name: string;
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [addProductModalVisible, setAddProductModalVisible] = useState(false)
  const [editProductModalVisible, setEditProductModalVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [form] = Form.useForm()
  const [categories, setCategories] = useState<Category[]>([]);

  const { Option } = Select;
  const accessToken = getAccessToken();

  useEffect(() => {

    axios

      .get('https://ecom-be-htgu.onrender.com/products')
      .then(response => {
        setProducts(response.data)
      })
      .catch(error => {
        console.error('Lỗi khi gọi API:', error)
      })
  }, [])
  useEffect(() => {
    axios.get('https://ecom-be-htgu.onrender.com/category',  {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
      )
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error while calling API:', error);
      });
  }, []);
  useEffect(() => {
    if (selectedProduct) {
      form.setFieldsValue({
        name: selectedProduct.product_name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        brand: selectedProduct.brand
      });
    }
  }, [selectedProduct, form]);
  const handleDelete = (productId: number) => {
    // Gọi API để xóa sản phẩm
    axios
      .delete(`https://ecom-be-htgu.onrender.com/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        message.success('Xóa sản phẩm thành công')
        // Cập nhật danh sách sản phẩm sau khi xóa
        setProducts(products.filter(product => product.id !== productId))
      })
      .catch(error => {
        console.error('Lỗi khi xóa sản phẩm:', error)
        message.error('Lỗi khi xóa sản phẩm')
      })
  }

  const handleAddProduct = () => {
    setAddProductModalVisible(true)
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setEditProductModalVisible(true)
  }

  const handleAddProductModalOk = () => {
    form.validateFields()
      .then(values => {
        // Gọi API để thêm sản phẩm
        axios
          .post('https://ecom-be-htgu.onrender.com/products', values , {
            headers: {
Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(response => {
            message.success('Thêm sản phẩm thành công')
            setProducts([...products, response.data])
            setAddProductModalVisible(false)
            form.resetFields()
          })
          .catch(error => {
            console.error('Lỗi khi thêm sản phẩm:', error)
            message.error('Lỗi khi thêm sản phẩm')
          })
      })
      .catch(error => {
        console.error('Lỗi khi xác thực form:', error)
      })
  }

  const handleEditProductModalOk = () => {
    form.validateFields()
      .then(values => {
        // Gọi API để cập nhật sản phẩm
        axios
          .patch(`https://ecom-be-htgu.onrender.com/products/${selectedProduct?.id}`, values, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
      })
          .then(response => {
            message.success('Cập nhật sản phẩm thành công')
            const updatedProducts = products.map(product => {
              if (product.id === selectedProduct?.id) {
return {
                  ...product,
                  ...values
                }
              }
              return product
            })
            setProducts(updatedProducts)
            setEditProductModalVisible(false)
            form.resetFields()
          })
          .catch(error => {
            console.error('Lỗi khi cập nhật sản phẩm:', error)
            message.error('Lỗi khi cập nhật sản phẩm')
          })
      })
      .catch(error => {
        console.error('Lỗi khi xác thực form:', error)
      })
  }

  const handleAddProductModalCancel = () => {
    setAddProductModalVisible(false)
    form.resetFields()
  }

  const handleEditProductModalCancel = () => {
    setEditProductModalVisible(false)
    form.resetFields()
  }

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
      title: <div className="centered-title">quantity_inventory</div>,
      dataIndex: 'quantity_inventory',
      key: 'quantity_inventory'
    },
    {
      title: <div className="centered-title">Brand</div>,
      dataIndex: 'brand',
      key: 'brand'
    },
    {
      title: <div className="centered-title">sku</div>,
      dataIndex: 'sku',
      key: 'sku'
    },
    {
      title: <div className="centered-title">Image</div>,
      dataIndex: 'image',
      key: 'image',
render: (image:string) => <img src={image} alt="Product" style={{width:"100px",height:"100px"}} />
    },
    {
      title: <div className="centered-title">Category</div>,
      dataIndex: 'category',
      key: 'category_name',
      render: (category: any) => category ? category.category_name : ''
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
  ]

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
  open={addProductModalVisible}
  onOk={handleAddProductModalOk}
  onCancel={handleAddProductModalCancel}
>
  <Form form={form} layout="vertical">
    <Form.Item
      name="product_name"
      label="Product name"
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
      name="quantity_inventory"
      label="Quantity Inventory"
      rules={[{ required: true, message: 'Please enter quantity inventory' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="brand"
      label="Brand"
      rules={[{ required: true, message: 'Please enter brand' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="sku"
      label="SKU"
      rules={[{ required: true, message: 'Please enter SKU' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
  name="category.id"
  label="Category"
  rules={[{ required: true, message: 'Please select category' }]}
>
<Select>
        {categories.map(category => (
          <Option key={category.id} value={category.id}>
            {category.category_name}
          </Option>
        ))}
      </Select>
</Form.Item>
    <Form.Item
      name="image"
      label="image"
      rules={[{ required: true, message: 'Please upload image' }]}
    >
      <Upload>
<Button icon={<UploadOutlined />}>Upload Image</Button>
      </Upload>
    </Form.Item>
  </Form>
</Modal>

      <Modal
        title="Edit Product"
        open={editProductModalVisible}
        onOk={handleEditProductModalOk}
        onCancel={handleEditProductModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Product Name"
            initialValue={selectedProduct?.product_name}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            initialValue={selectedProduct?.description}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            initialValue={selectedProduct?.price}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="brand"
            label="Brand"
            initialValue={selectedProduct?.brand}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="image"
            rules={[{ required: true, message: 'Please upload image' }]}
          >
            <Upload>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="quantity_inventory"
            label="quantity_inventory"
            initialValue={selectedProduct?.quantity_inventory}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="sku"
            label="SKU"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="category"
            initialValue={selectedProduct?.category}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ProductTable