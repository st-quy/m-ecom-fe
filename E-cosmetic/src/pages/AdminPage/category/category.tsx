import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import axios from 'axios';

interface Category {
  id: number;
  category_name: string;
  delete_at: string | null;
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addForm] = Form.useForm();

  useEffect(() => {
    // Gọi API và cập nhật dữ liệu vào biến categories
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get('https://ecom-be-htgu.onrender.com/category')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error: any) => {
        console.error('Lỗi khi gọi API:', error);
      });
  };

  const handleAction = (category: Category) => {
    setEditingCategory(category);
    setIsModalVisible(true);
  };

  const handleUpdate = () => {
    const updatedCategory = addForm.getFieldsValue();
    updateCategory(updatedCategory);
  };

  const updateCategory = (category: Category) => {
    axios
      .put(`https://ecom-be-htgu.onrender.com/category/${category.id}`, category)
      .then((response) => {
        message.success('Cập nhật category thành công');
        setIsModalVisible(false);
        fetchCategories();
      })
      .catch((error: any) => {
        console.error('Lỗi khi cập nhật category:', error);
      });
  };

  const handleDelete = (categoryId: number) => {
    deleteCategory(categoryId);
  };

  const deleteCategory = (categoryId: number) => {
    axios
      .delete(`https://ecom-be-htgu.onrender.com/category/${categoryId}`)
      .then((response) => {
        message.success('Xóa category thành công');
        fetchCategories();
      })
      .catch((error: any) => {
        console.error('Lỗi khi xóa category:', error);
      });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'category_name',
      key: 'category_name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Category) => (
        <span>
          <Button type="primary"  size="small" onClick={() => handleAction(record)}>
            Chỉnh sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa danh mục này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <Button type="primary" danger size="small">
              Xóa
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={categories} columns={columns} />

      <Modal
        title="Chỉnh sửa danh mục"
        open={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={addForm} initialValues={editingCategory || {}}>
          <Form.Item name="category_name" label="Tên danh mục" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;