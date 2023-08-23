import React from 'react'
import { Button } from 'antd'

interface BillProps {
  billNumber: string
  amount: number
  onPayBill: () => void
}

const Bill: React.FC<BillProps> = ({ billNumber, amount, onPayBill }) => {
  return (
    <div>
      <h2>Bill Number: {billNumber}</h2>
      <p>Amount: {amount}</p>
      <Button type="primary" onClick={onPayBill}>
        Pay Bill
      </Button>
    </div>
  )
}

export default Bill