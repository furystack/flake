import { FC, FormEvent, useCallback, useState } from 'react'
import { User } from 'common'
import { useQueryClient } from 'react-query'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
import { Button, Tab, TextField, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { GitHub, Google } from '@mui/icons-material'
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

export const LoginPage: FC<{ onLoggedIn?: (user: User) => void }> = (props) => {
  const queryClient = useQueryClient()

  const callApi = useAuthApiContext()
  const intl = useIntl()

  const googleAuth = useGoogleAuth()
  const snack = useSnackbar()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [tabValue, setTabValue] = useState<'login' | 'signUp'>('login')

  const login = useCallback(
    async (ev: FormEvent) => {
      ev.preventDefault()
      try {
        const response = await callApi({
          method: 'POST',
          action: '/login',
          body: {
            username,
            password,
          },
        })
        props.onLoggedIn?.(response.result)
        queryClient.invalidateQueries('GET_CURRENT_USER')
      } catch (error) {
        snack.enqueueSnackbar(intl.formatMessage(messages.invalidEmailOrPassword), { variant: 'error' })
      }
    },
    [callApi, intl, password, props, queryClient, snack, username],
  )

  return (
    <div className="loginContainer" style={{ padding: '5em' }}>
      {/* <img src={Logo} style={{ height: 140, margin: '20px auto' }} /> */}
      <Typography variant="h1">Flake</Typography>
      <TabContext value={tabValue}>
        <TabList onChange={(_ev, newValue) => setTabValue(newValue)}>
          <Tab value="login" label={<FormattedMessage {...messages.login} />} />
          <Tab value="signUp" label={<FormattedMessage {...messages.signUp} />} />
        </TabList>
        <TabPanel value="login">
          <form onSubmit={login} data-testid="login-form">
            <TextField
              label={<FormattedMessage {...messages.email} />}
              type="email"
              onChange={(ev) => setUsername(ev.target.value)}
              required
            />
            <TextField
              type="password"
              onChange={(ev) => setPassword(ev.target.value)}
              required
              label={<FormattedMessage {...messages.password} />}
            />

            <Button type="submit">
              <FormattedMessage {...messages.login} />
            </Button>
            <Button
              onClick={() => {
                googleAuth.login()
              }}>
              <Google />
            </Button>
            <Button
              onClick={() => {
                alert('TODO')
              }}>
              <GitHub />
            </Button>
          </form>
        </TabPanel>
        <TabPanel value="signUp">
          <form onSubmit={login} data-testid="login-form">
            <TextField required type="email" label={<FormattedMessage {...messages.email} />} />
            <TextField required type="password" label={<FormattedMessage {...messages.password} />} />
            <TextField required type="password" label={<FormattedMessage {...messages.confirmPassword} />} />

            <Button type="submit">
              <FormattedMessage {...messages.login} />
            </Button>
            <Button
              onClick={() => {
                googleAuth.login()
              }}>
              <Google />
            </Button>
            <Button
              onClick={() => {
                alert('TODO')
              }}>
              <GitHub />
            </Button>
          </form>
        </TabPanel>
      </TabContext>
    </div>
  )
}
