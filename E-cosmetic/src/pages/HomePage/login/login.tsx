import { Space, Card, Input, Form, Button, Divider } from 'antd'
import { UserOutlined, FacebookOutlined } from '@ant-design/icons'
import { Link,useNavigate  } from 'react-router-dom'
import requestApi from '~/helpers/helper'
import { useTokenDecoding } from '~/helpers/api'
const Login = () => {

  const [accessToken, decodedToken] = useTokenDecoding();
  const navigate = useNavigate();

  const onFinish = async (values: { phoneNumber: string; password: string }) => {
    try {
      const { phoneNumber, password } = values;
      await requestApi<any>('/auth/login', 'POST', {
        phoneNumber,
        password
      }).then((res) => {
        localStorage.setItem('accessToken', res.data.accessToken);
     
      });
  
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Wrong username or password!');
    }
  };

  if (decodedToken && (decodedToken.role === 'admin' ||decodedToken.role==="marketing")) {
    navigate('*'); 
    console.log(decodedToken.role);
  }else if( (decodedToken && decodedToken.role === 'user' )){
    console.log(decodedToken?.role);
    navigate('/homepage')
  }
  return (
    <>
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
              title='Sign in'
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
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <Button
                      type='primary'
                      htmlType='submit'
                      style={{
                        width: '100%',
                        borderRadius: '16px',
                        height: '44px',
                        fontSize: '18px',
                        fontWeight: '400'
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
                  }} href='https://ecom-be-htgu.onrender.com/login/google'
                >
                  <FacebookOutlined style={{ color: 'blue' }} /> Continue with Facebook
                </Button>

                <h5 style={{ textAlign: 'center' }}>
                  <u>Forgot your password?</u>
                </h5>
              </Space>
            </Card>
          </div>
        </Space>
      </div>

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
        Don't have an account?{' '}
        <Link to='/sign-up'>
          <u>Sign up</u>
        </Link>
      </Button>
    </>
  )
}

export default Login
