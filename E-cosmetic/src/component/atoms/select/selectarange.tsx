import React from 'react';
import { Select } from 'antd';

const handleChange = (name: string, value: string) => {
  console.log(name, value);
};

const SelectComponent: React.FC<{ name: string; onChange: (value: string) => void }> = ({
  name,
  onChange,
}) => (
  <Select
    className="custom-select"
    labelInValue
    defaultValue={{ value: 'default', label: 'Default' }}
    onChange={(selectedValue) => {
      const value = selectedValue?.value || ''; // Lấy giá trị `value` từ đối tượng được chọn
      handleChange(name, value);
      onChange(value);
    }}
    options={[
      {
        value: 'ASC',
        label: 'From Low to Hight',
      },
      {
        value: 'DESC',
        label: 'From Hight to Low',
      },
    ]}
    style={{ width: '100%', height: '40px' }}
  />
);

export default SelectComponent;