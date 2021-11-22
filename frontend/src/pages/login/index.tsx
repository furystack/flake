import { FC, useState } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { Tab, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { LoginForm } from './login-form'

export const loginPageMessages = defineMessages({
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

export const LoginPage: FC = () => {
  const [tabValue, setTabValue] = useState<'login' | 'signUp'>('login')

  return (
    <div
      className="loginContainer"
      style={{
        padding: '5em',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '75%',
        alignContent: 'center',
        justifyContent: 'center',
      }}>
      {/* <img src={Logo} style={{ height: 140, margin: '20px auto' }} /> */}
      <Typography variant="h1">Flake</Typography>
      <TabContext value={tabValue}>
        <TabList onChange={(_ev, newValue) => setTabValue(newValue)}>
          <Tab value="login" label={<FormattedMessage {...loginPageMessages.login} />} />
          <Tab value="signUp" label={<FormattedMessage {...loginPageMessages.signUp} />} />
        </TabList>
        <TabPanel value="login">
          <LoginForm />
        </TabPanel>
        <TabPanel value="signUp">
          <>TODO: Sign Up form</>
        </TabPanel>
      </TabContext>
    </div>
  )
}
