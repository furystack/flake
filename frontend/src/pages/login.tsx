import { FC } from 'react'
import { Button, Form, Input, notification, Typography } from 'antd'
import { User } from 'common'
import { useApiContext } from '../hooks/use-api'
import { useQueryClient } from 'react-query'

export const LoginPage: FC<{ onLoggedIn: (user: User) => void }> = (props) => {
  const queryClient = useQueryClient()

  const callApi = useApiContext()

  const login = async (values: { email: string; password: string }) => {
    try {
      const response = await callApi({
        method: 'POST',
        action: '/login',
        body: {
          username: values.email,
          password: values.password,
        },
      })
      props.onLoggedIn(response.result)
      queryClient.invalidateQueries('GET_CURRENT_USER')
    } catch (error) {
      notification.error({ message: 'Invalid e-mail or password' })
    }
  }

  return (
    <div className="loginContainer">
      {/* <img src={Logo} style={{ height: 140, margin: '20px auto' }} /> */}
      <Typography.Title level={3} style={{ margin: '0 auto 50px', color: '#00417A' }}>
        Login to Flake
      </Typography.Title>

      <Form layout="vertical" onFinish={login}>
        <Typography.Title level={1}>Login</Typography.Title>

        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: `Please provide a valid e-mail address` }]}>
          <Input type="email" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: `Please provide a password` }]}>
          <Input type="password" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" style={{ marginRight: 10 }}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
