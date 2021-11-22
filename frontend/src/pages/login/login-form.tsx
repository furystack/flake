import { Button, Grid, TextField } from '@mui/material'
import { useSnackbar } from 'notistack'
import { FC, FormEvent, useCallback, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useMutation, useQueryClient } from 'react-query'
import { GitHub, Google } from '@mui/icons-material'
import { useAuthApiContext } from '../../hooks/use-auth-api'
import { useGoogleAuth } from '../../hooks/use-google-auth'
import { loginPageMessages } from '.'

export const LoginForm: FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const queryClient = useQueryClient()

  const callApi = useAuthApiContext()
  const intl = useIntl()
  const snack = useSnackbar()

  const googleAuth = useGoogleAuth()

  const login = useCallback(
    async (ev: FormEvent) => {
      ev.preventDefault()
      try {
        await callApi({
          method: 'POST',
          action: '/login',
          body: {
            username,
            password,
          },
        })
        //
      } catch (error) {
        snack.enqueueSnackbar(intl.formatMessage(loginPageMessages.invalidEmailOrPassword), { variant: 'error' })
      }
    },
    [callApi, intl, password, snack, username],
  )

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries('GET_CURRENT_USER')
    },
  })

  return (
    <form onSubmit={mutate} data-testid="login-form">
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
          <Button
            disabled={isLoading}
            onClick={() => {
              googleAuth.login()
            }}>
            <Google />
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => {
              alert('TODO')
            }}>
            <GitHub />
          </Button>
          <Button type="submit" color="primary" variant="contained" disabled={isLoading}>
            <FormattedMessage {...loginPageMessages.login} />
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
