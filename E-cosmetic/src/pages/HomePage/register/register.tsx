import { Space, Card, Input, Form, Button, Row, Col, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()

  const onFinish = async (values: { phoneNumber: string; password: string }) => {
    try {
      const { phoneNumber, password } = values
      await axios
        .post('https://ecom-be-htgu.onrender.com/auth/register', {
          phoneNumber,
          password
        })
        .then((response) => {
          if (response.status === 201) {
            message.success('Sign up successfully')
            navigate('/sign-in')
          }
        })
    } catch (error) {
      message.error('Account or password already exists!')
    }
  }

  return (
    <Row className='register__container'>
      <Col className='form__container'>
        <Space size={20}>
          <img
            src='https://atinproduction.com/wp-content/uploads/2021/05/meliss3262-Edit-1280x1920.jpg'
            style={{ width: '527px', height: '663px', objectFit: 'cover', borderRadius: '10px' }}
            alt=''
          />
          <Card
            title='Sign up'
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
                  <Input size='large' placeholder='Input phone number' prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item
                  label='Your password'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name='password'
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password size='large' placeholder='Input password' />
                </Form.Item>
                <Form.Item
                  label='Your password'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name='password1'
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password size='large' placeholder='Input password' />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button
                    htmlType='submit'
                    style={{
                      width: '100%',
                      background: '#ffb8c9',
                      borderRadius: '16px',
                      height: '44px',
                      color: '#FFF',
                      fontSize: '22px',
                      fontStyle: 'normal',
                      fontWeight: '500'
                    }}
                  >
                    Sign up
                  </Button>
                </Form.Item>
                <Button
                  style={{
                    width: '100%',
                    height: '44px',
                    color: '#000',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    padding: '0px'
                  }}
                  onClick={() => navigate('/sign-in')}
                >
                  I have an account? <Link to='/sign-in'> Sign in</Link>
                </Button>
              </Form>
            </Space>
          </Card>
        </Space>
      </Col>
    </Row>
  )
}

export default Register
