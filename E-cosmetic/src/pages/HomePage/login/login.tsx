import { Space, Card, Input, Form, Button, Divider, Row, Col, message } from 'antd'
import { UserOutlined, GoogleOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import requestApi from '~/helpers/helper'
import axios from 'axios'
import { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { DecodedToken } from '~/helpers/api'

const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ecom-be-htgu.onrender.com/login/google/callback', {})

        const accessToken: string = response.data.accessToken

        localStorage.setItem('accessToken', accessToken)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const onFinish = async (values: { phoneNumber: string; password: string }) => {
    try {
      const { phoneNumber, password } = values
      await requestApi<any>('/auth/login', 'POST', {
        phoneNumber,
        password
      }).then((res) => {
        const decodedToken = jwt_decode(res.data.accessToken) as DecodedToken
        localStorage.setItem('role', decodedToken.role)
        if (decodedToken && (decodedToken.role === 'admin' || decodedToken.role === 'marketing')) {
          message.success('Login successful')
          navigate('/dashboard')
        } else if (decodedToken.role === 'user') {
          message.success('Login successful')
          navigate('/')
        }
        localStorage.setItem('accessToken', res.data.accessToken)
      })
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed. Wrong username or password!')
    }
  }

  return (
    <Row className='login__container'>
      <Col className='form__container'>
        <Space size={20}>
          <img
            src='https://atinproduction.com/wp-content/uploads/2021/05/meliss3262-Edit-1280x1920.jpg'
            alt=''
            style={{ width: '527px', height: '663px', objectFit: 'cover', borderRadius: '10px' }}
          />
          <Card
            title='Sign in'
            bordered={false}
            style={{ width: 500, height: 663 }}
            headStyle={{ textAlign: 'center', fontSize: '2em' }}
          >
            <Space direction='vertical' style={{ width: '100%' }} size={20}>
              <Form onFinish={onFinish}>
                <Form.Item
                  label='Phone number'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name='phoneNumber'
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input size='large' placeholder='Enter phone number' prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item
                  label='Your password'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name='password'
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password size='large' placeholder='Enter password' />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button
                    type='primary'
                    htmlType='submit'
                    style={{
                      width: '100%',
                      borderRadius: '16px',
                      height: '44px',
                      fontSize: '18px',
                      fontWeight: '400',
                      backgroundColor: '#ffb8c9'
                    }}
                  >
                    Sign in
                  </Button>
                </Form.Item>
              </Form>
              <Divider>OR</Divider>
              <Button
                style={{
                  width: '100%',
                  borderColor: '#000',
                  borderRadius: '16px',
                  height: '44px',
                  color: '#000',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: '400'
                }}
                href='https://ecom-be-htgu.onrender.com/login/google'
              >
                <GoogleOutlined /> Continue with Google
              </Button>
              <Button
                style={{
                  width: '100%',
                  height: '44px',
                  color: '#000',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  padding: '0px',
                  borderRadius: '16px'
                }}
                onClick={() => navigate('/sign-up')}
              >
                Don't have an account? <Link to='/sign-up'> Sign up</Link>
              </Button>
            </Space>
          </Card>
        </Space>
      </Col>
    </Row>
  )
}

export default Login
