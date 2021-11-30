import { Button, ButtonGroup, Grid, TextField, Typography } from '@mui/material'
import { FC, FormEvent, useCallback, useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { GitHub, Google } from '@mui/icons-material'
import { LoginProviderData } from 'common'
import { useGoogleSignup } from '../../hooks/use-google-auth'
import { useSignup } from '../../hooks/use-signup'
import { loginPageMessages } from '.'

export const SignupForm: FC<{ oauthData: LoginProviderData }> = ({ oauthData }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const {
    mutate: googleSignup,
    error: googleSignupError,
    isLoading: googleSignupIsLoading,
  } = useGoogleSignup(oauthData.googleClientId)

  const { mutate: signUp, error: signUpError, isLoading: signupIsLoading } = useSignup()

  const error = useMemo(
    () => googleSignupError || signUpError || (password !== confirmPassword && new Error('Passwords must match')),
    [confirmPassword, googleSignupError, password, signUpError],
  )
  const isLoading = useMemo(() => signupIsLoading || googleSignupIsLoading, [googleSignupIsLoading, signupIsLoading])

  const signupHandler = useCallback(
    (ev: FormEvent) => {
      ev.preventDefault()
      signUp({ email: username, password })
    },
    [password, signUp, username],
  )

  return (
    <form onSubmit={signupHandler} data-testid="login-form">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
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
        <Grid item xs={12} lg={4}>
          <TextField
            disabled={isLoading}
            fullWidth
            type="password"
            onChange={(ev) => setPassword(ev.target.value)}
            required
            label={<FormattedMessage {...loginPageMessages.password} />}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            disabled={isLoading}
            fullWidth
            type="password"
            onChange={(ev) => setConfirmPassword(ev.target.value)}
            required
            label={<FormattedMessage {...loginPageMessages.confirmPassword} />}
          />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <ButtonGroup>
            <Button
              disabled={isLoading}
              onClick={() => {
                googleSignup()
              }}>
              <Google sx={{ mr: '4px' }} />
              <FormattedMessage {...loginPageMessages.signUpWithGoogle} />
            </Button>
            <Button disabled={true}>
              <GitHub sx={{ mr: '4px' }} />
              <FormattedMessage {...loginPageMessages.signUpWithGithub} />
            </Button>
            <Button type="submit" color="primary" variant="contained" disabled={isLoading}>
              <FormattedMessage {...loginPageMessages.signUpWithPassword} />
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
