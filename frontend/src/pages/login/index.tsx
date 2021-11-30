import { FC, useState } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { CircularProgress, Tab, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useOauthData } from '../../hooks/use-oauth-data'
import { LoginForm } from './login-form'
import { SignupForm } from './signup-form'

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
  confirmPasswordMustMatch: {
    id: 'login.confirmPasswordMustMatch',
    defaultMessage: 'The Password and the Confirm Password must be the same',
  },
  login: {
    id: 'login.login',
    defaultMessage: 'Login',
  },
  signUp: {
    id: 'login.signUp',
    defaultMessage: 'Sign up',
  },
  signUpWithGoogle: {
    id: 'login.signUpWithGoogle',
    defaultMessage: 'With Google',
  },
  signUpWithGithub: {
    id: 'login.signUpWithGithub',
    defaultMessage: 'With Github',
  },
  signUpWithPassword: {
    id: 'login.signUpWithPassword',
    defaultMessage: 'With local user',
  },
})

export const LoginPage: FC = () => {
  const [tabValue, setTabValue] = useState<'login' | 'signUp'>('login')

  const { isLoading, data: oauthData } = useOauthData()

  if (isLoading || !oauthData) {
    return <CircularProgress />
  }

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
          <LoginForm oauthData={oauthData} />
        </TabPanel>
        <TabPanel value="signUp">
          <SignupForm oauthData={oauthData} />
        </TabPanel>
      </TabContext>
    </div>
  )
}
