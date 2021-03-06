import { Button, ButtonGroup, Grid, TextField, Typography } from '@mui/material'
import { FC, FormEvent, useCallback, useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { GitHub, Google } from '@mui/icons-material'
import { LoginProviderData } from 'common'
import { useGoogleLogin } from '../../hooks/use-google-auth'
import { useLogin } from '../../hooks/use-login'
import { loginPageMessages } from '.'

export const LoginForm: FC<{ oauthData: LoginProviderData }> = ({ oauthData }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {
    mutate: googleLogin,
    error: googleLoginError,
    isLoading: googleIsLoading,
  } = useGoogleLogin(oauthData.googleClientId)

  const { mutate: login, error: loginError, isLoading: loginIsLoading } = useLogin()

  const error = useMemo(() => googleLoginError || loginError, [googleLoginError, loginError])
  const isLoading = useMemo(() => loginIsLoading || googleIsLoading, [googleIsLoading, loginIsLoading])

  const loginHandler = useCallback(
    (ev: FormEvent) => {
      ev.preventDefault()
      login({ username, password })
    },
    [login, password, username],
  )

  return (
    <form onSubmit={loginHandler} data-testid="login-form">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            disabled={isLoading}
            fullWidth
            label={<FormattedMessage {...loginPageMessages.email} />}
            type="email"
            onChange={(ev) => {
              setUsername(ev.target.value)
            }}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            disabled={isLoading}
            fullWidth
            type="password"
            onChange={(ev) => setPassword(ev.target.value)}
            required
            label={<FormattedMessage {...loginPageMessages.password} />}
          />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <ButtonGroup>
            <Button
              disabled={isLoading}
              onClick={() => {
                googleLogin()
              }}>
              <Google />
            </Button>
            <Button disabled={true}>
              <GitHub />
            </Button>
            <Button type="submit" color="primary" variant="contained" disabled={isLoading}>
              <FormattedMessage {...loginPageMessages.login} />
            </Button>
          </ButtonGroup>
        </Grid>
        {error ? (
          <Typography variant="body2" color="error">
            {(error as Error).message}
          </Typography>
        ) : null}
      </Grid>
    </form>
  )
}
