import { Space, Card, Input, Form, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate() 

  const onFinish = async (values: { phoneNumber: string, password: string }) => {
    try {
      const { phoneNumber, password } = values;
      const response = await axios.post('https://ecom-be-htgu.onrender.com/auth/register', {
        phoneNumber,
        password,
      });

      const { data } = response;
      console.log('Login successful:', data);
      alert('Sign up successfully, Please Sign in again!'); 

      navigate("/sign-in");

    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Account or password already exists!'); 
    }
  };

  return (
    <div style={{ backgroundColor: '#8CAE71', minHeight: '100vh' }}>
      <Space size={20} style={{ margin: '6.5% 16%' }}>
        <div>
          <Card bordered={false} style={{ background: 'rgba(126, 170, 146, 0.30)' }}>
            <img
              src='../../../../src/assets/meliss3262-Edit-1280x1920 1 (1).png'
              style={{ width: '427px', height: '463px' }}
              alt=''
            />
          </Card>
        </div>
        <div>
          <Card
            title='Sign up'
            bordered={false}
            style={{ width: 500 }}
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
                      background: '#7EAA92',
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
              </Form>
            </Space>
          </Card>
        </div>
      </Space>
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
      >
        I have an account?{' '}
        <Link to='/sign-in'>
          <u>Sign in</u>
        </Link>
      </Button>
    </div>
  )
}

export default Register
