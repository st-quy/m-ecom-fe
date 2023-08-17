// MenuWithOnClick.tsx
import React from 'react';
import { Dropdown, message } from 'antd';
import { MenuProps } from 'antd';

interface CartModel extends MenuProps {
  className?: string;
  children: React.ReactNode;
}

const CartModel: React.FC<CartModel> = ({ className, children, ...menuProps }) => {
  const onClick: MenuProps['onClick'] = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  return (
    <Dropdown menu={{ ...menuProps, onClick }} className={className}>
      {children}
    </Dropdown>
  );
};

export default CartModel;