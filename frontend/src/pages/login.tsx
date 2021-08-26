import { FC } from 'react'
import { GithubOutlined, GoogleOutlined } from '@ant-design/icons'
import { Button, Form, Input, notification, Tabs, Typography } from 'antd'
import { User } from 'common'
import { useQueryClient } from 'react-query'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
import { useAuthApiContext } from '../hooks/use-auth-api'
import { useGoogleAuth } from '../hooks/use-google-auth'

const messages = defineMessages({
  email: {
    id: 'login.email',
    defaultMessage: 'E-mail address',
  },
  password: {
    id: 'login.password',
    defaultMessage: 'Password',
  },
  confirmPassword: {
    id: 'login.confirmPassword',
    defaultMessage: 'Confirm Password',
  },
  invalidEmailOrPassword: {
    id: 'login.invalidEmailOrPassword',
    defaultMessage: 'Invalid e-mail or password',
  },
  missingOrWrongEmail: {
    id: 'login.missingOrWrongEmail',
    defaultMessage: 'Please provide a valid e-mail address',
  },
  missingPassword: {
    id: 'login.missingPassword',
    defaultMessage: 'Please provide a password',
  },
  login: {
    id: 'login.login',
    defaultMessage: 'Login',
  },
  signUp: {
    id: 'login.signUp',
    defaultMessage: 'Sign up',
  },
})

export const LoginPage: FC<{ onLoggedIn: (user: User) => void }> = (props) => {
  const queryClient = useQueryClient()

  const callApi = useAuthApiContext()
  const intl = useIntl()

  const googleAuth = useGoogleAuth()

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
      notification.error({ message: intl.formatMessage(messages.invalidEmailOrPassword) })
    }
  }

  return (
    <div className="loginContainer" style={{ padding: '5em' }}>
      {/* <img src={Logo} style={{ height: 140, margin: '20px auto' }} /> */}
      <Typography.Title level={3} style={{ margin: '0 auto 50px', color: '#00417A' }}>
        Flake
      </Typography.Title>
      <Tabs type="card" defaultActiveKey="1" size="large">
        <Tabs.TabPane tab={intl.formatMessage(messages.login)} key="1">
          <Form layout="vertical" onFinish={login} data-testid="login-form">
            <Form.Item
              label={<FormattedMessage {...messages.email} />}
              name="email"
              rules={[{ required: true, message: intl.formatMessage(messages.missingOrWrongEmail) }]}>
              <Input type="email" />
            </Form.Item>

            <Form.Item
              label={<FormattedMessage {...messages.password} />}
              name="password"
              rules={[{ required: true, message: intl.formatMessage(messages.missingPassword) }]}>
              <Input type="password" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary" style={{ marginRight: 10 }}>
                <FormattedMessage {...messages.login} />
              </Button>
              <Button
                htmlType="button"
                type="default"
                style={{ marginRight: 10 }}
                onClick={() => {
                  googleAuth.login()
                }}>
                <GoogleOutlined />
              </Button>
              <Button
                htmlType="button"
                type="default"
                style={{ marginRight: 10 }}
                onClick={() => {
                  alert('TODO')
                }}>
                <GithubOutlined />
              </Button>
            </Form.Item>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab={intl.formatMessage(messages.signUp)} key="2">
          <Form layout="vertical" onFinish={login} data-testid="login-form">
            <Form.Item
              label={<FormattedMessage {...messages.email} />}
              name="email"
              rules={[{ required: true, message: intl.formatMessage(messages.missingOrWrongEmail) }]}>
              <Input type="email" />
            </Form.Item>

            <Form.Item
              label={<FormattedMessage {...messages.password} />}
              name="password"
              rules={[{ required: true, message: intl.formatMessage(messages.missingPassword) }]}>
              <Input type="password" />
            </Form.Item>

            <Form.Item
              label={<FormattedMessage {...messages.confirmPassword} />}
              name="password"
              rules={[{ required: true, message: intl.formatMessage(messages.missingPassword) }]}>
              <Input type="password" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary" style={{ marginRight: 10 }}>
                <FormattedMessage {...messages.login} />
              </Button>
              <Button
                htmlType="button"
                type="default"
                style={{ marginRight: 10 }}
                onClick={() => {
                  googleAuth.login()
                }}>
                <GoogleOutlined />
              </Button>
              <Button
                htmlType="button"
                type="default"
                style={{ marginRight: 10 }}
                onClick={() => {
                  alert('TODO')
                }}>
                <GithubOutlined />
              </Button>
            </Form.Item>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
