import { FC } from 'react'
import { Button, Form, Input, notification, Typography } from 'antd'
import { User } from 'common'
import { useApiContext } from '../hooks/use-api'
import { useQueryClient } from 'react-query'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'

const messages = defineMessages({
  email: {
    id: 'login.email',
    defaultMessage: 'E-mail address',
  },
  password: {
    id: 'login.password',
    defaultMessage: 'Password',
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
})

export const LoginPage: FC<{ onLoggedIn: (user: User) => void }> = (props) => {
  const queryClient = useQueryClient()

  const callApi = useApiContext()
  const intl = useIntl()

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

      <Form layout="vertical" onFinish={login} data-testid="login-form">
        <Typography.Title level={1}>
          <FormattedMessage {...messages.login} />
        </Typography.Title>

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
        </Form.Item>
      </Form>
    </div>
  )
}
