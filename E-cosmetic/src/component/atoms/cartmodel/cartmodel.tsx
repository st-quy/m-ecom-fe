// MenuWithOnClick.tsx
import React from 'react'
import { Dropdown } from 'antd'
import { MenuProps } from 'antd'

interface CartModel extends MenuProps {
  className?: string
  children: React.ReactNode
}

const CartModel: React.FC<CartModel> = ({ className, children, ...menuProps }) => {
  return (
    <Dropdown menu={{ ...menuProps }} className={className}>
      {children}
    </Dropdown>
  )
}

export default CartModel
