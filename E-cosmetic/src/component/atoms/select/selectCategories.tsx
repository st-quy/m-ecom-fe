import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

interface Category {
  id: string;
  category_name: string;
}

interface SelectCategoriesProps {
  name: string;
  onChange: (value: string) => void;
}

const SelectCategories: React.FC<SelectCategoriesProps> = ({ name, onChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ecom-be-htgu.onrender.com/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (selectedValue: { value: string; label: string } | undefined) => {
    const value = selectedValue?.value || '';
    onChange(value);
  };

  return (
    <Select
      className="custom-select"
      labelInValue
      defaultValue={{ value: 'default', label: 'Default' }}
      onChange={handleChange}
      options={categories.map((category) => ({
        value: category.id,
        label: category.category_name,
      }))}
      style={{ width: '100%', height: '40px' }}
    />
  );
};

export default SelectCategories;