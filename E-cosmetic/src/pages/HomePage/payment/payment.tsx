import { useEffect, useState } from 'react'
import { Row, Col, Form, Input, Button, Table, Space, Select } from 'antd'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { getAccessToken } from '~/Auth/auth'
import Header from '../header/header'
import Footer from '../footer/footer'

const { Column } = Table

const CheckoutForm = () => {
  const accessToken = getAccessToken()
  const [cart, setCart] = useState<any>(null)
  const [form] = Form.useForm()
  const { id } = useParams<any>()
  const [data, setData] = useState('')

  const { Option } = Select

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await axios.get(`https://ecom-be-htgu.onrender.com/carts/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      const cartData = response.data[0]
      setCart(cartData)
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  }

  const generateQRCode = async (formData: any) => {
    try {
      const response = await axios.post('https://ecom-be-htgu.onrender.com/checkout/generateQRCode', formData)

      setData(response.data)

      console.log('thanh cong')
      console.log('QR code:', formData)
    } catch (error) {
      console.log('QR code:', formData)

      console.error('Error generating QR code:', error)
    }
  }

  const handleCheckout = async (values: any) => {
    const { Recipient_name, delivery_address, Recipient_phone, paymentId } = values
    const formData = {
      Recipient_name,
      delivery_address,
      Recipient_phone,
      userId: id,
      paymentId
    }

    await generateQRCode(formData)
    if (data) {
      window.location.href = data
    }
  }

  const dataSource =
    cart?.cartsProduct?.map((item: any) => ({
      key: item.product.id,
      cartId: item.cartId,
      product: item.product,
      product_name: item.product.product_name,

      price: item.product.price,
      quantity: item.quantity,
      description: item.product.description,
      total_price: item.quantity * item.product.price,
      total_payment: cart.total_price
    })) || []

  return (
    <>
      <Header />
      <div className='Cart-container'>
        <Row gutter={[20, 40]}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form form={form} onFinish={handleCheckout} layout='vertical'>
              <Form.Item
                label='Recipient Name'
                name='Recipient_name'
                rules={[{ required: true, message: 'Please enter recipient name' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='Delivery Address'
                name='delivery_address'
                rules={[{ required: true, message: 'Please enter delivery address' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='Recipient Phone'
                name='Recipient_phone'
                rules={[{ required: true, message: 'Please enter recipient phone' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Payment'
                name='paymentId'
                rules={[{ required: true, message: 'Please enter payment method' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Checkout
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Space direction='vertical' size='large'>
              <div className='Bill-container'>
                <h2>Bill</h2>
                <Table dataSource={dataSource} pagination={false}>
                  <Column title='Product Name' dataIndex='product_name' key='product_name' />

                  <Form.Item
                    label='Payment'
                    name='paymentId'
                    rules={[{ required: true, message: 'Please select a payment method' }]}
                  >
                    <Select>
                      <Option value={1}>COD</Option>
                      <Option value={2}>Momo</Option>
                    </Select>
                  </Form.Item>
                  <Column title='Price' dataIndex='price' key='price' />
                  <Column title='Quantity' dataIndex='quantity' key='quantity' />
                  <Column title='Total Price' dataIndex='total_price' key='total_price' />
                </Table>
              </div>
              <div style={{ float: 'right', marginRight: '40px' }}>
                {cart && (
                  <>
                    <h4>Total Quantity product: {cart.total_quantity}</h4>
                    <h4>Total Payment: ${cart.total_price}</h4>
                  </>
                )}
              </div>
            </Space>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  )
}

export default CheckoutForm
