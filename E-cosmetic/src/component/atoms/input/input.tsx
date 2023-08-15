import React from 'react';
import { Input } from 'antd';

const { Search } = Input;
const onSearch = (value: string) => console.log(value);

const InputComponent: React.FC = () => (
  <Search
    placeholder="searching by name......"
    allowClear
    enterButton={<span className="custom-enter-button">Search</span>} // Thêm lớp tùy chỉnh cho nút "Search"
    size="large"
    onSearch={onSearch}
    className="custom-search" // Thêm lớp tùy chỉnh cho thành phần Search
  />
);

export default InputComponent;