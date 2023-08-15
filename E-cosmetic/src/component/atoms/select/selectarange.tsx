import React from 'react';
import { Select } from 'antd';

const handleChange = (name: string, value: { value: string; label: React.ReactNode }) => {
  console.log(name, value);
};

const SelectComponent: React.FC<{ name: string }> = ({ name }) => (
  <Select
    labelInValue
    defaultValue={{ value: 'default', label: 'Default' }}
    style={{ width: "100%", padding: "7px" }} // Adjusted height to 7px
    onChange={(value) => handleChange(name, value)}
    options={[
      {
        value: 'ESC',
        label: 'Hight to Low',
      },
      {
        value: 'DESC',
        label: 'Low to Hight',
      },
    ]}
  />
);

export default SelectComponent;